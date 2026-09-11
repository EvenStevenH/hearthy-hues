import { randomize, getRandomIdea, getRandomRGB, getRandomHSL } from "../utils/ideaUtils.js";
import { describe, it, expect } from "vitest";
import { subjects } from "../data/ideas.js";

const regexHex = /^#([0-9A-Fa-f]{6})$/;
const regexRGB = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/;
const regexHSL = /^hsl\((360|([1-9]?[0-9]{1,2})), ([0-9]{1,3})%, ([0-9]{1,3})%\)$/;

describe("randomize", () => {
	it("return a number within specified range", () => {
		expect(randomize(10)).toBeGreaterThanOrEqual(0).toBeLessThanOrEqual(10);
		expect(randomize(10, 0)).toBeGreaterThanOrEqual(0).toBeLessThanOrEqual(10);
		expect(randomize(10, -10)).toBeGreaterThanOrEqual(-10).toBeLessThanOrEqual(10);
	});

	it("handle min being larger than max", () => {
		expect(() => randomize(0, 5)).toThrow(RangeError);
		expect(() => randomize(0, 100)).toThrow(RangeError);
		expect(() => randomize(-100, 10)).toThrow(RangeError);
	});
});

describe("getRandomIdea", () => {
	it("returns an object with a category and subject", () => {
		const result = getRandomIdea(subjects);
		expect(result).toHaveProperty("category");
		expect(result).toHaveProperty("subject");
		expect(Object.keys(subjects)).toContain(result.category);
		expect(subjects[result.category]).toContain(result.subject);
	});
});

describe("getRandomRGB", () => {
	it("return an object with a valid RGB and HEX code", () => {
		const result = getRandomRGB();
		expect(result).toHaveProperty("rgb").toHaveProperty("hex");
		expect(result.rgb).toMatch(regexRGB);
		expect(result.hex).toMatch(regexHex);
	});
});

describe("getRandomHSL", () => {
	const validHarmonies = ["monochromatic", "complementary", "split complementary", "triadic", "tetradic", "analogous"];
	function expectValidHSL(result) {
		expect(result).toHaveProperty("harmony").toHaveProperty("colors");
		expect(validHarmonies).toContain(result.harmony);
		result.colors.forEach((color) => {
			expect(color).toMatch(regexHSL);
		});
	}

	it("return an object with a valid harmony", () => {
		expectValidHSL(getRandomHSL());
	});

	it("handle invalid args by returning a random harmony", () => {
		expectValidHSL(getRandomHSL("dog"));
		expectValidHSL(getRandomHSL("dog", "cat"));
		expectValidHSL(getRandomHSL("split-comp", 400));
		expectValidHSL(getRandomHSL(null, -10));
	});
});
