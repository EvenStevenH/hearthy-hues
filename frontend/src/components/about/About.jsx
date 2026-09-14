import ContactForm from "./ContactForm";
import { postImages } from "../../data/images";

export default function About() {
	return (
		<main className="about">
			<section
				className="container"
				id="aboutSection"
			>
				<img
					id="aboutImg"
					src={postImages.art2.url}
					alt={postImages.art2.alt}
				/>

				<div className="aboutContent">
					<h1>About</h1>

					<p>
						<b>Hearthy Hue</b> is an app created by me,{" "}
						<a
							href="https://github.com/EvenStevenH"
							target="_blank"
						>
							Steven Huang
						</a>
						, that helps creatives discover events!
					</p>

					<ul>
						<li>Utilizes frontend technologies such as HTML for structure, CSS for styling, JavaScript for interactivity, and React for component-based UI and state management.</li>

						<li>Naming trivia! A "hearth" is the area around a fireplace (and sounds like "heart"). A "hue" is a color or pigment, standing for arts and creativity (and also sounds like "you"). Together, the name inspires a cozy gathering place where we can connect our community!</li>
					</ul>

					<table className="aboutTable">
						<thead>
							<tr>
								<th id="aboutTableLeft">Feature</th>
								<th id="aboutTableRight">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Dashboard</td>
								<td>A mock social media feed, your saved events, and a simple tool to roll random subjects and color harmonies.</td>
							</tr>
							<tr>
								<td>Events</td>
								<td>View and save events, with event details in a separate view.</td>
							</tr>

							<tr>
								<td>Your Profile</td>
								<td>View information about you and your friends.</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section className="container contactSection">
				<h2>Contact</h2>
				<ContactForm />
			</section>
		</main>
	);
}
