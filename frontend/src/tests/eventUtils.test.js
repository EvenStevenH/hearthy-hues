import { describe, it, expect } from "vitest";
import { formatTimeRange, formatDate, formatPrice } from "../utils/eventUtils.js";

describe("formatTimeRange", () => {
	it("return formatted time range", () => {
		const startDate = new Date("2026-06-01T09:00:00");
		const endDate = new Date("2026-06-01T17:00:00");
		expect(formatTimeRange(startDate, endDate)).toBe("9:00 AM – 5:00 PM");
	});
});

describe("formatDate", () => {
	it("return formatted date", () => {
		const startDate = new Date("2026-06-01T09:00:00");
		expect(formatDate(startDate)).toBe("Monday, June 1, 2026");
	});
});

describe("formatPrice", () => {
	it("return formatted price", () => {
		expect(formatPrice(100)).toBe("$100");
		expect(formatPrice(0)).toBe("Free");
	});

	it("handle invalid prices", () => {
		expect(formatPrice(undefined)).toBe("Free");
		expect(formatPrice(null)).toBe("Free");
	});
});
