import { afterEach, describe, expect, it } from "vitest";
import {
  LOOKBACK_DAYS_DEFAULT,
  describeWindow,
  getLookbackDays,
  getLookbackMs,
  getSinceDate,
  trendingRangeLabel,
} from "../window.ts";

describe("lookback window", () => {
  afterEach(() => {
    delete process.env["LOOKBACK_DAYS"];
  });

  it("defaults to a weekly window", () => {
    expect(getLookbackDays()).toBe(LOOKBACK_DAYS_DEFAULT);
    expect(LOOKBACK_DAYS_DEFAULT).toBe(7);
  });

  it("honours LOOKBACK_DAYS", () => {
    process.env["LOOKBACK_DAYS"] = "3";
    expect(getLookbackDays()).toBe(3);
    expect(getLookbackMs()).toBe(3 * 24 * 60 * 60 * 1000);
  });

  it("treats an empty value as unset", () => {
    process.env["LOOKBACK_DAYS"] = "";
    expect(getLookbackDays()).toBe(LOOKBACK_DAYS_DEFAULT);
  });

  it.each(["0", "-1", "1.5", "week", "7d"])("rejects invalid value %s", (raw) => {
    process.env["LOOKBACK_DAYS"] = raw;
    expect(() => getLookbackDays()).toThrow(/positive integer/);
  });

  it("computes the window start from a given now", () => {
    process.env["LOOKBACK_DAYS"] = "7";
    const now = new Date("2026-08-30T00:00:00.000Z");
    expect(getSinceDate(now).toISOString()).toBe("2026-08-23T00:00:00.000Z");
  });

  it("labels the trending range by window size", () => {
    process.env["LOOKBACK_DAYS"] = "7";
    expect(trendingRangeLabel()).toBe("this week");
    process.env["LOOKBACK_DAYS"] = "1";
    expect(trendingRangeLabel()).toBe("today");
  });

  it("describes the window in both languages", () => {
    process.env["LOOKBACK_DAYS"] = "7";
    expect(describeWindow("zh")).toBe("过去 7 天");
    expect(describeWindow("en")).toBe("the last 7 days");
    process.env["LOOKBACK_DAYS"] = "1";
    expect(describeWindow("zh")).toBe("过去 24 小时");
    expect(describeWindow("en")).toBe("the last 24 hours");
  });
});
