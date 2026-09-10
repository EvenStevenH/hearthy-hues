import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import EventCard from "./EventCard";
import { sortByStartDate } from "../../utils/eventUtils";

export default function EventsPage({ events }) {
	if (events.loading) return <Loader />;
	if (events.error) return <ErrorMessage message={events.error} />;

	return (
		<main>
			<h1>Events</h1>

			{events.data.length ? (
				<section className="grid gridEvents">
					{events.data
						.sort((a, b) => sortByStartDate(a, b, "startDate"))
						.map((event) => (
							<EventCard
								event={event}
								key={event.id}
							/>
						))}
				</section>
			) : (
				<p className="emptyMsg">No events available!</p>
			)}
		</main>
	);
}
