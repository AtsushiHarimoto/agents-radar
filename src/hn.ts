/**
 * Hacker News AI 熱門討論。
 *
 * 兩條抓取路徑：
 * - **Algolia 搜尋**（週報預設）：可以按「發文時間」查整個回溯窗口，拿得到過去 N 天的貼文。
 * - **Firebase topstories**（上游原始做法）：只拿得到「當下」的熱榜，沒有時間維度。
 *
 * 上游是日報，當下熱榜約等於今天的熱門，所以夠用；但週報用 topstories 等於只反映
 * 執行那一刻的榜單，中間六天的熱帖完全看不到。故回溯 >1 天時走 Algolia，
 * Algolia 失敗才退回 topstories（會在 log 明說退回了，不靜默）。
 */

import { getLookbackDays, getLookbackMs } from "./window.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HnStory {
  id: string;
  hnRank?: number;
  title: string;
  url: string; // external URL, or HN discussion link if no external URL
  hnUrl: string; // always the HN discussion link
  points: number;
  comments: number;
  author: string;
  createdAt: string;
}

export interface HnData {
  stories: HnStory[];
  fetchSuccess: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HN_TOP_STORIES = 30;
const HN_STORIES_TO_SCAN = 500;
const HN_BATCH_SIZE = 50;

const HN_TOPSTORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const HN_ITEM_URL = (id: number) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

/** Algolia HN Search API。 */
const HN_ALGOLIA_URL = "https://hn.algolia.com/api/v1/search";

/** Algolia 搜尋用的關鍵詞（各自一次查詢，結果去重後合併）。 */
const HN_SEARCH_QUERIES = [
  "AI",
  "LLM",
  "AI agent",
  "OpenAI",
  "Anthropic Claude",
  "machine learning",
] as const;

/** 每個關鍵詞取回的筆數上限。 */
const HN_HITS_PER_QUERY = 50;

/** 進入報告的最低分數，濾掉窗口內大量零互動的貼文。 */
const HN_MIN_POINTS = 20;

// ---------------------------------------------------------------------------
// Firebase API types
// ---------------------------------------------------------------------------

interface HnFirebaseItem {
  id: number;
  deleted?: boolean;
  dead?: boolean;
  type?: string;
  by?: string;
  time?: number;
  title?: string;
  url?: string;
  score?: number;
  descendants?: number;
}

const AI_KEYWORD_PATTERNS = [
  /\bai\b/i,
  /\ba\.i\./i,
  /\bllm(s)?\b/i,
  /\bml\b/i,
  /machine learning/i,
  /deep learning/i,
  /neural/i,
  /transformer/i,
  /language model(s)?\b/i,
  /foundation model(s)?\b/i,
  /\brag\b/i,
  /agent(s)?\b/i,
  /openai/i,
  /anthropic/i,
  /claude/i,
  /chatgpt/i,
  /gemini/i,
  /copilot/i,
];

function isAiRelated(item: HnFirebaseItem): boolean {
  const text = `${item.title ?? ""} ${item.url ?? ""}`;
  return AI_KEYWORD_PATTERNS.some((pattern) => pattern.test(text));
}

function toHnStory(item: HnFirebaseItem, hnRank: number): HnStory {
  const id = String(item.id);
  const hnUrl = `https://news.ycombinator.com/item?id=${id}`;

  return {
    id,
    hnRank,
    title: item.title ?? "(untitled)",
    url: item.url ?? hnUrl,
    hnUrl,
    points: item.score ?? 0,
    comments: item.descendants ?? 0,
    author: item.by ?? "unknown",
    createdAt: item.time ? new Date(item.time * 1000).toISOString() : new Date(0).toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

/** Algolia 單筆搜尋結果。 */
interface HnAlgoliaHit {
  objectID: string;
  title: string | null;
  url: string | null;
  points: number | null;
  num_comments: number | null;
  author: string | null;
  created_at: string | null;
}

interface HnAlgoliaResponse {
  hits: HnAlgoliaHit[];
}

/** Algolia hit → HnStory。Algolia 沒有「當下排名」的概念，故 hnRank 留空。 */
function algoliaHitToStory(hit: HnAlgoliaHit): HnStory {
  const hnUrl = `https://news.ycombinator.com/item?id=${hit.objectID}`;
  return {
    id: hit.objectID,
    title: hit.title ?? "(untitled)",
    url: hit.url ?? hnUrl,
    hnUrl,
    points: hit.points ?? 0,
    comments: hit.num_comments ?? 0,
    author: hit.author ?? "unknown",
    createdAt: hit.created_at ?? new Date(0).toISOString(),
  };
}

/**
 * 走 Algolia 抓回溯窗口內的 AI 熱帖。
 *
 * 多個關鍵詞各查一次、以 objectID 去重、再用與 topstories 路徑同一套關鍵詞規則過濾，
 * 最後依分數排序取前 {@link HN_TOP_STORIES} 筆。
 *
 * @returns 任一查詢成功即 `fetchSuccess: true`；全部失敗回 false 交給呼叫端決定是否退回。
 */
async function fetchHnViaAlgolia(): Promise<HnData> {
  const cutoffSec = Math.floor((Date.now() - getLookbackMs()) / 1000);
  const seen = new Map<string, HnStory>();
  let anyQuerySucceeded = false;

  await Promise.all(
    HN_SEARCH_QUERIES.map(async (query) => {
      const url =
        `${HN_ALGOLIA_URL}?query=${encodeURIComponent(query)}&tags=story` +
        `&numericFilters=created_at_i>${cutoffSec}&hitsPerPage=${HN_HITS_PER_QUERY}`;
      try {
        const resp = await fetch(url, { headers: { "User-Agent": "agents-radar/1.0" } });
        if (!resp.ok) {
          console.error(`  [hn/algolia] "${query}": HTTP ${resp.status}`);
          return;
        }
        const data = (await resp.json()) as HnAlgoliaResponse;
        anyQuerySucceeded = true;
        for (const hit of data.hits ?? []) {
          if (!hit.title) continue;
          if (!isAiRelated({ id: Number(hit.objectID), title: hit.title, url: hit.url ?? undefined })) {
            continue;
          }
          if ((hit.points ?? 0) < HN_MIN_POINTS) continue;
          if (!seen.has(hit.objectID)) seen.set(hit.objectID, algoliaHitToStory(hit));
        }
      } catch (err) {
        console.error(`  [hn/algolia] "${query}": ${err}`);
      }
    }),
  );

  const stories = [...seen.values()].sort((a, b) => b.points - a.points).slice(0, HN_TOP_STORIES);

  console.log(
    `  [hn/algolia] ${stories.length} AI stories (last ${getLookbackDays()}d, ${seen.size} unique, min ${HN_MIN_POINTS} points)`,
  );
  return { stories, fetchSuccess: anyQuerySucceeded && stories.length > 0 };
}

/**
 * 抓 HN AI 熱帖。
 *
 * 回溯窗口 >1 天時先走 Algolia（有時間維度），失敗才退回 Firebase topstories。
 */
export async function fetchHnData(): Promise<HnData> {
  if (getLookbackDays() > 1) {
    const viaAlgolia = await fetchHnViaAlgolia();
    if (viaAlgolia.fetchSuccess) return viaAlgolia;
    console.error("  [hn] Algolia returned nothing — falling back to topstories (current hot list only).");
  }
  return fetchHnViaTopStories();
}

/** Firebase topstories 路徑：只反映「當下」熱榜，沒有時間窗。 */
async function fetchHnViaTopStories(): Promise<HnData> {
  try {
    const topResp = await fetch(HN_TOPSTORIES_URL, {
      headers: { "User-Agent": "agents-radar/1.0" },
    });
    if (!topResp.ok) {
      console.error(`  [hn] topstories: HTTP ${topResp.status}`);
      return { stories: [], fetchSuccess: false };
    }

    const topIds = ((await topResp.json()) as number[]).slice(0, HN_STORIES_TO_SCAN);
    const stories: HnStory[] = [];

    for (let i = 0; i < topIds.length && stories.length < HN_TOP_STORIES; i += HN_BATCH_SIZE) {
      const batchIds = topIds.slice(i, i + HN_BATCH_SIZE);
      const items = await Promise.all(
        batchIds.map(async (id): Promise<HnFirebaseItem | null> => {
          const resp = await fetch(HN_ITEM_URL(id), {
            headers: { "User-Agent": "agents-radar/1.0" },
          });
          if (!resp.ok) {
            console.error(`  [hn] item ${id}: HTTP ${resp.status}`);
            return null;
          }
          return (await resp.json()) as HnFirebaseItem;
        }),
      );

      for (let j = 0; j < items.length && stories.length < HN_TOP_STORIES; j += 1) {
        const item = items[j];
        if (!item || item.deleted || item.dead || item.type !== "story" || !item.title) {
          continue;
        }
        if (isAiRelated(item)) {
          stories.push(toHnStory(item, i + j + 1));
        }
      }
    }

    console.log(`  [hn] ${stories.length} AI stories (scanned ${topIds.length} topstories)`);
    return { stories, fetchSuccess: stories.length > 0 };
  } catch (err) {
    console.error(`  [hn] fetch failed: ${err}`);
    return { stories: [], fetchSuccess: false };
  }
}
