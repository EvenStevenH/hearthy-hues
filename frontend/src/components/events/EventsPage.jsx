import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import EventCard from "./EventCard";
import { sortByStartDate } from "../../utils/eventUtils";
import { useEvents } from "../../utils/EventsContext";
import { Link } from "react-router";
import { MdEdit } from "react-icons/md";

export default function EventsPage() {
	const { events, loading, error } = useEvents();
	if (loading) return <Loader />;
	if (error) return <ErrorMessage message={error} />;

	return (
		<main>
			<h1>Events</h1>

			<Link
				to="/events/new"
				id="eventCreateBtn"
				className="button"
			>
				Create Event <MdEdit />
			</Link>

			{events.length ? (
				<section className="grid gridEvents">
					{[...events]
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
