/**
 * 回溯窗口（lookback window）集中定義。
 *
 * 上游 agents-radar 是「日報」，各資料源各自寫死 24h / 48h / 7d 三種窗口。
 * moyin fork 改跑「週報」，故把窗口收攏到這裡由 `LOOKBACK_DAYS` 統一控制，
 * 避免改一處漏一處（改了 index.ts 卻漏掉 arxiv.ts 會讓報告只有一天的論文）。
 *
 * 各源仍可有自己的下限（例如 ArXiv 有 ~1 天發佈延遲，窗口不得小於 48h），
 * 那類下限寫在各自的檔案裡，用 `Math.max()` 與本檔的值取大者。
 */

/** 預設回溯天數（週報）。 */
export const LOOKBACK_DAYS_DEFAULT = 7;

/** 一天的毫秒數。 */
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * 取得回溯天數。
 *
 * 讀環境變數 `LOOKBACK_DAYS`，未設定時回傳 {@link LOOKBACK_DAYS_DEFAULT}。
 *
 * @throws 值不是正整數時直接拋錯（fail-closed）。靜默退回預設會讓「打錯字的
 *   週報」看起來跟正常週報一模一樣，只是內容少了六天，事後查不出來。
 */
export function getLookbackDays(): number {
  const raw = process.env["LOOKBACK_DAYS"];
  if (raw === undefined || raw === "") return LOOKBACK_DAYS_DEFAULT;

  const days = Number(raw);
  if (!Number.isInteger(days) || days <= 0) {
    throw new Error(`LOOKBACK_DAYS must be a positive integer, got: ${JSON.stringify(raw)}`);
  }
  return days;
}

/** 回溯窗口的毫秒數。 */
export function getLookbackMs(): number {
  return getLookbackDays() * DAY_MS;
}

/**
 * 回溯窗口的起點（現在往前推 N 天）。
 *
 * @param now 基準時間，預設為當下（測試可注入固定值）。
 */
export function getSinceDate(now: Date = new Date()): Date {
  return new Date(now.getTime() - getLookbackMs());
}

/**
 * GitHub Trending 榜單週期的標籤，用於在 prompt 裡標註 star 增量的時間單位。
 *
 * 與 `trending.ts` 的 range 判斷同一條線：回溯 ≥7 天抓 weekly 榜，否則 daily。
 */
export function trendingRangeLabel(): string {
  return getLookbackDays() >= 7 ? "this week" : "today";
}

/**
 * 窗口的人類可讀描述，用於報告內文。
 *
 * @param lang 語言。
 */
export function describeWindow(lang: "zh" | "en"): string {
  const days = getLookbackDays();
  if (lang === "en") return days === 1 ? "the last 24 hours" : `the last ${days} days`;
  return days === 1 ? "过去 24 小时" : `过去 ${days} 天`;
}
