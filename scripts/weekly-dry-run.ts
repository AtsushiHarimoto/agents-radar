/**
 * 週報空跑：只抓資料 + 量 prompt 長度，**完全不呼叫 LLM**。
 *
 * 存在理由：週報的窗口是日報的 7 倍，單次 prompt 也跟著脹。本機 gateway 走的是
 * grok 網頁通道，有每週用量池，若某個 prompt 已經長到會被截斷或撐爆一次額度，
 * 得在「跑掉一整輪」之前就知道，而不是看報告缺內容才回頭猜。
 *
 * 輸出：每個資料源抓到幾筆、各 prompt 幾個字元、粗估 token 數。
 * 粗估用 chars/4（英文）——只用來看數量級，不是計費依據。
 */

import { fetchTrendingData } from "../src/trending.ts";
import { fetchHnData } from "../src/hn.ts";
import { fetchPhData } from "../src/ph.ts";
import { fetchArxivData } from "../src/arxiv.ts";
import { fetchHfData } from "../src/hf.ts";
import { fetchDevtoData } from "../src/devto.ts";
import { fetchLobstersData } from "../src/lobsters.ts";
import {
  buildTrendingPrompt,
  buildHnPrompt,
  buildPhPrompt,
  buildArxivPrompt,
  buildHfPrompt,
  buildCommunityPrompt,
} from "../src/prompts-data.ts";
import { toCstDateStr } from "../src/date.ts";
import { getLookbackDays } from "../src/window.ts";

/** 粗估 token 數（chars/4）。只看數量級。 */
function approxTokens(text: string): number {
  return Math.round(text.length / 4);
}

function report(name: string, count: number, prompt: string): void {
  console.log(
    `${name.padEnd(12)} items=${String(count).padStart(4)}  prompt=${String(prompt.length).padStart(7)} chars  ~${String(approxTokens(prompt)).padStart(6)} tok`,
  );
}

async function main(): Promise<void> {
  const dateStr = toCstDateStr(new Date());
  console.log(`[dry-run] lookback=${getLookbackDays()}d date=${dateStr} — 不會呼叫 LLM\n`);

  const [trending, hn, ph, arxiv, hf, devto, lobsters] = await Promise.all([
    fetchTrendingData(),
    fetchHnData(),
    fetchPhData(),
    fetchArxivData(),
    fetchHfData(),
    fetchDevtoData(),
    fetchLobstersData(),
  ]);

  console.log("");
  report("trending", trending.trendingRepos.length + trending.searchRepos.length, buildTrendingPrompt(trending, dateStr, "en"));
  report("hn", hn.stories.length, buildHnPrompt(hn, dateStr, "en"));
  report("producthunt", ph.products.length, buildPhPrompt(ph, dateStr, "en"));
  report("arxiv", arxiv.papers.length, buildArxivPrompt(arxiv, dateStr, "en"));
  report("huggingface", hf.models.length, buildHfPrompt(hf, dateStr, "en"));
  report(
    "community",
    devto.articles.length + lobsters.stories.length,
    buildCommunityPrompt(devto, lobsters, dateStr, "en"),
  );

  const failures = [
    ["trending", trending.trendingFetchSuccess],
    ["hn", hn.fetchSuccess],
    ["producthunt", ph.fetchSuccess],
    ["arxiv", arxiv.fetchSuccess],
    ["huggingface", hf.fetchSuccess],
    ["devto", devto.fetchSuccess],
    ["lobsters", lobsters.fetchSuccess],
  ].filter(([, ok]) => !ok);

  console.log("");
  if (failures.length === 0) {
    console.log("[dry-run] 所有資料源都有回資料。");
  } else {
    console.log(`[dry-run] ⚠ 沒抓到資料的來源：${failures.map(([n]) => n).join(", ")}`);
  }
}

await main();
