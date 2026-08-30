import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchHnData } from "../hn.ts";

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("fetchHnData (topstories path)", () => {
  // 回溯 1 天才會走 Firebase topstories；預設的 7 天會先打 Algolia。
  beforeEach(() => {
    process.env["LOOKBACK_DAYS"] = "1";
  });

  afterEach(() => {
    delete process.env["LOOKBACK_DAYS"];
    vi.restoreAllMocks();
  });

  it("preserves Hacker News rank order after filtering AI stories", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = String(input);

      if (url.endsWith("/topstories.json")) {
        return jsonResponse([101, 102, 103, 104]);
      }

      const id = Number(url.match(/item\/(\d+)\.json$/)?.[1]);
      const items = new Map<number, unknown>([
        [
          101,
          {
            id: 101,
            type: "story",
            by: "alice",
            time: 1_800_000_000,
            title: "Open hardware router",
            score: 500,
            descendants: 20,
            url: "https://example.com/router",
          },
        ],
        [
          102,
          {
            id: 102,
            type: "story",
            by: "bob",
            time: 1_800_000_100,
            title: "A global workspace in language models",
            score: 100,
            descendants: 10,
            url: "https://example.com/language-models",
          },
        ],
        [
          103,
          {
            id: 103,
            type: "story",
            by: "carol",
            time: 1_800_000_200,
            title: "Office suite for AI agents",
            score: 300,
            descendants: 15,
            url: "https://example.com/ai-agents",
          },
        ],
        [
          104,
          {
            id: 104,
            type: "story",
            by: "dave",
            time: 1_800_000_300,
            title: "Ask HN: Favorite terminals",
            score: 400,
            descendants: 30,
            url: "https://example.com/terminals",
          },
        ],
      ]);

      return jsonResponse(items.get(id) ?? null);
    });

    const result = await fetchHnData();

    expect(result.fetchSuccess).toBe(true);
    expect(result.stories.map((story) => story.id)).toEqual(["102", "103"]);
    expect(result.stories.map((story) => story.hnRank)).toEqual([2, 3]);
    expect(result.stories.map((story) => story.points)).toEqual([100, 300]);
  });

  it("returns an unsuccessful result when the topstories request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse({ error: "failed" }, 500));

    const result = await fetchHnData();

    expect(result).toEqual({ stories: [], fetchSuccess: false });
  });
});

describe("fetchHnData (Algolia path)", () => {
  afterEach(() => {
    delete process.env["LOOKBACK_DAYS"];
    vi.restoreAllMocks();
  });

  function algoliaHit(overrides: Record<string, unknown>): Record<string, unknown> {
    return {
      objectID: "1",
      title: "An LLM agent framework",
      url: "https://example.com/a",
      points: 120,
      num_comments: 30,
      author: "alice",
      created_at: "2026-08-28T00:00:00.000Z",
      ...overrides,
    };
  }

  it("queries Algolia with the lookback window and dedupes across queries", async () => {
    process.env["LOOKBACK_DAYS"] = "7";
    const urls: string[] = [];

    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = String(input);
      urls.push(url);
      return jsonResponse({
        hits: [
          algoliaHit({ objectID: "1", points: 120 }),
          algoliaHit({ objectID: "2", title: "Claude Code ships skills", points: 300 }),
        ],
      });
    });

    const result = await fetchHnData();

    expect(urls.every((u) => u.startsWith("https://hn.algolia.com/api/v1/search?"))).toBe(true);
    expect(
      urls.every((u) => /numericFilters=created_at_i%3E\d+|numericFilters=created_at_i>\d+/.test(u)),
    ).toBe(true);
    // 六個關鍵詞各回同兩筆 → 去重後只剩兩筆，並依分數由高到低排序。
    expect(result.stories.map((s) => s.id)).toEqual(["2", "1"]);
    expect(result.fetchSuccess).toBe(true);
  });

  it("drops low-score and non-AI stories", async () => {
    process.env["LOOKBACK_DAYS"] = "7";

    vi.spyOn(globalThis, "fetch").mockImplementation(async () =>
      jsonResponse({
        hits: [
          algoliaHit({ objectID: "10", title: "A neural retrieval engine", points: 120 }),
          algoliaHit({ objectID: "11", title: "An LLM toy", points: 3 }), // 分數太低
          algoliaHit({ objectID: "12", title: "Best mechanical keyboards", url: null, points: 500 }), // 與 AI 無關
        ],
      }),
    );

    const result = await fetchHnData();

    expect(result.stories.map((s) => s.id)).toEqual(["10"]);
  });

  it("falls back to topstories when Algolia yields nothing", async () => {
    process.env["LOOKBACK_DAYS"] = "7";

    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = String(input);
      if (url.startsWith("https://hn.algolia.com/")) return jsonResponse({ error: "boom" }, 500);
      if (url.endsWith("/topstories.json")) return jsonResponse([201]);
      return jsonResponse({
        id: 201,
        type: "story",
        by: "bob",
        time: 1_800_000_000,
        title: "An AI agent that files taxes",
        score: 90,
        descendants: 5,
        url: "https://example.com/tax-agent",
      });
    });

    const result = await fetchHnData();

    expect(result.stories.map((s) => s.id)).toEqual(["201"]);
    expect(result.fetchSuccess).toBe(true);
  });
});
