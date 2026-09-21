import { useState } from "react";
import { getRandomIdea, getRandomHSL } from "../../utils/ideaUtils";
import { useLocalStorage } from "../../utils/hooks";
import { FaRandom, FaBookmark } from "react-icons/fa";

export default function Randomizer({ subjects }) {
	const [idea, setIdea] = useState(getRandomIdea(subjects));
	const [colors, setColors] = useState(getRandomHSL());
	const [savedIdeas, setSavedIdeas] = useLocalStorage("savedIdeas", []);
	const [savedHarmonies, setSavedHarmonies] = useLocalStorage("savedHarmonies", []);

	const getIdea = () => {
		setIdea(getRandomIdea(subjects));
	};

	const getHarmony = () => {
		setColors(getRandomHSL());
	};

	const saveIdea = () => {
		setSavedIdeas((prev) => [...prev, idea]);
	};

	const saveHarmony = () => {
		setSavedHarmonies((prev) => [...prev, colors]);
	};

	return (
		<>
			<div>
				<div className="randomIdea">
					<p>
						<b>Category</b>: {idea.category}
					</p>
					<p>
						<b>Subject</b>: {idea.subject}
					</p>
				</div>

				<div className="randomizerButtons">
					<button
						onClick={getIdea}
						id="randomSubjectBtn"
					>
						New subject! <FaRandom />
					</button>

					<button
						onClick={saveIdea}
						id="saveSubjectBtn"
					>
						Save <FaBookmark />
					</button>
				</div>
			</div>

			<hr />

			<div>
				<p>
					<b>Color Harmony</b>: {colors.harmony}
				</p>

				<ul className="randomHarmony">
					{colors.colors.map((color, index) => (
						<li
							key={index}
							className="colorSwatch"
							style={{ backgroundColor: color }}
						></li>
					))}
				</ul>

				<div className="randomizerButtons">
					<button
						onClick={getHarmony}
						id="randomHarmonyBtn"
					>
						New color harmony! <FaRandom />
					</button>

					<button
						onClick={saveHarmony}
						id="saveHarmonyBtn"
					>
						Save <FaBookmark />
					</button>
				</div>
			</div>
		</>
	);
}
