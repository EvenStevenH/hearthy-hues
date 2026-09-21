import { FaTrash } from "react-icons/fa";
import { useLocalStorage } from "../../utils/hooks";

export default function SavedIdeas() {
	const [savedIdeas, setSavedIdeas] = useLocalStorage("savedIdeas", []);
	const [savedHarmonies, setSavedHarmonies] = useLocalStorage("savedHarmonies", []);

	const removeIdea = (idea) => {
		setSavedIdeas((prev) => prev.filter((_, index) => index !== idea));
	};

	const removeHarmony = (harmony) => {
		setSavedHarmonies((prev) => prev.filter((_, index) => index !== harmony));
	};

	return (
		<main>
			<h1>Saved Ideas</h1>

			<section className="savedIdeas">
				<section className="savedIdeasSection container">
					<h2>Subjects</h2>

					{savedIdeas.length ? (
						<div className="savedIdeasList">
							{savedIdeas.map((idea, index) => (
								<article
									className="savedIdea"
									key={index}
								>
									<div>
										<p>
											<b>Category</b>: {idea.category}
										</p>
										<p>
											<b>Subject</b>: {idea.subject}
										</p>
									</div>

									<button
										onClick={() => removeIdea(index)}
										id="removeSavedIdeaBtn"
									>
										<FaTrash />
									</button>
								</article>
							))}
						</div>
					) : (
						<p className="emptyMsg">No subjects saved.</p>
					)}
				</section>

				<section className="savedIdeasSection container">
					<h2>Color Harmonies</h2>

					{savedHarmonies.length ? (
						<div className="savedHarmoniesList">
							{savedHarmonies.map((harmony, index) => (
								<article
									className="savedHarmony"
									key={index}
								>
									<div>
										<p>
											<b>Harmony</b>: {harmony.harmony}
										</p>

										<ul className="randomHarmony">
											{harmony.colors.map((color, colorIndex) => (
												<li
													key={colorIndex}
													className="colorSwatch"
													style={{ backgroundColor: color }}
												></li>
											))}
										</ul>
									</div>

									<button
										onClick={() => removeHarmony(index)}
										id="removeSavedIdeaBtn"
									>
										<FaTrash />
									</button>
								</article>
							))}
						</div>
					) : (
						<p className="emptyMsg">No color harmonies saved.</p>
					)}
				</section>
			</section>
		</main>
	);
}
