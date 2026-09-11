export function randomize(max, min = 0) {
	if (min > max) throw new RangeError("Min must be <= max!");
	return Math.floor(Math.random() * (max - min + 1)) + min; // min-max inclusive
}

export function getRandomIdea(ideas) {
	const categories = Object.keys(ideas); // array of category names
	const category = categories[randomize(categories.length - 1)];
	const subjects = ideas[category]; // array from category
	const subject = subjects[randomize(subjects.length - 1)];
	return { category, subject };
}

export function getRandomRGB() {
	const r = randomize(255);
	const g = randomize(255);
	const b = randomize(255);
	const binary = (1 << 24) + (r << 16) + (g << 8) + b; // left shift > 32-bit int
	return {
		rgb: `rgb(${r}, ${g}, ${b})`,
		hex: `#${binary.toString(16).slice(1)}`, // hex string > remove prefix
	};
}

export function getRandomHSL(harmony = null, hue = null) {
	const validHarmonies = ["monochromatic", "complementary", "split complementary", "triadic", "tetradic", "analogous"];
	if (!validHarmonies.includes(harmony)) {
		harmony = validHarmonies[randomize(validHarmonies.length - 1)];
	}
	if (!hue || typeof hue !== "number" || hue < 0 || hue > 360) {
		hue = randomize(360); // base hue
	}

	const harmonies = {
		"monochromatic": () => [0, 5, -5, randomize(5, -5)],
		"complementary": () => [0, randomize(10, -10), 180, randomize(190, 170)],
		"split complementary": () => [0, 150, 210, randomize(210, 150)],
		"triadic": () => [0, 120, 240, randomize(10, -10)],
		"tetradic": () => [0, 90, 180, 270],
		"analogous": () => [0, 30, -30, randomize(30, -30)],
	};
	return {
		harmony,
		colors: harmonies[harmony]() // compute only needed values (lazy eval)
			.map((offset) => (((hue + offset) % 360) + 360) % 360) // shift within 0–360 range
			.map((hue) => `hsl(${hue}, ${randomize(100)}%, ${randomize(100)}%)`),
	};
}
