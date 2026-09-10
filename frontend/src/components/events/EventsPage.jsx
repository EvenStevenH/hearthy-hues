import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import EventCard from "./EventCard";
import { sortByStartDate } from "../../utils/eventUtils";
import { events as eventsData } from "../../data/events.js";
import { useFetch } from "../../utils/hooks.js";

export default function EventsPage() {
	const { data: events, loading, error } = useFetch(eventsData);
	if (loading) return <Loader />;
	if (error) return <ErrorMessage message={error} />;

	return (
		<main>
			<h1>Events</h1>

			{events.length ? (
				<section className="grid gridEvents">
					{events
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
