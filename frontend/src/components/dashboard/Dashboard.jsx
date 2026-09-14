import Randomizer from "./Randomizer";
import PostCard from "./PostCard";
import EventCard from "../events/EventCard";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import { useEvents } from "../../utils/EventsContext";
import { Link } from "react-router";
import { useFetch } from "../../utils/hooks";
import { sortByStartDate } from "../../utils/eventUtils";
import { subjects as ideasData } from "../../data/ideas.js";
import { feed as feedData } from "../../data/feed.js";

export default function Dashboard({ events }) {
	const { savedEvents, removeEvent } = useEvents();
	const subjects = useFetch(ideasData);
	const feed = useFetch(feedData);

	if (events.loading || subjects.loading || feed.loading) return <Loader />;
	if (events.error || subjects.error || feed.error)
		return (
			<>
				<ErrorMessage message={events.error} />
				<ErrorMessage message={subjects.error} />
				<ErrorMessage message={feed.error} />
			</>
		);

	return (
		<main>
			<h1>Dashboard</h1>

			<section className="dashboardSection">
				<section
					className="container"
					id="feedSection"
				>
					<h2>Feed</h2>

					{feed.data.length ? (
						<div className="postFeed">
							{feed.data
								.sort((a, b) => sortByStartDate(a, b, "timestamp"))
								.map((post) => (
									<PostCard
										post={post}
										key={post.id}
									/>
								))}
						</div>
					) : (
						<p className="emptyMsg">No posts available.</p>
					)}
				</section>

				<section
					className="container"
					id="randomizer"
				>
					<h2>Random Ideas</h2>
					<Randomizer subjects={subjects.data} />
				</section>
			</section>

			<section className="savedEvents">
				<h2>Your Events</h2>

				{savedEvents.length ? (
					<div className="gridDashboard">
						{events.data
							.filter((event) => savedEvents.includes(event.id))
							.sort((a, b) => sortByStartDate(a, b, "startDate"))
							.map((event) => (
								<EventCard
									event={event}
									key={event.id}
									removeEvent={() => removeEvent(event.id)}
								/>
							))}
					</div>
				) : (
					<p className="emptyMsg">
						No events saved. <Link to="/events">Find some here!</Link>
					</p>
				)}
			</section>
		</main>
	);
}
