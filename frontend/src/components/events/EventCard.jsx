import { formatDate, formatTimeRange } from "../../utils/eventUtils.js";
import { useEvents } from "../../utils/EventsContext.jsx";
import { Link, useNavigate } from "react-router";
import { FaBookmark, FaNewspaper } from "react-icons/fa6";

export default function EventCard({ event }) {
	const { saveEvent, unsaveEvent, isSavedEvent, deleteEvent } = useEvents();
	const navigate = useNavigate();
	const isSaved = isSavedEvent(event.id);

	async function handleDelete() {
		await deleteEvent(event.id);
		navigate("/events");
	}

	const handleEdit = () => {
		navigate(`/events/${event.id}/edit`);
	};

	return (
		<div className="container card eventCard">
			<img
				src={event.img.url}
				alt={event.img.alt}
				id="eventImg"
			/>

			<div className="cardDetails">
				<div>
					<div className="tags">
						{event.tags.map((tag) => (
							<span
								key={tag}
								className="tag"
							>
								{tag}
							</span>
						))}
					</div>
					<h3 className="title">{event.title}</h3>
				</div>

				<div>
					<p className="date">
						{formatDate(event.startDate, "short", "short")} | {formatTimeRange(event.startDate, event.endDate)}
					</p>
					<p className="location">{event.location}</p>
				</div>
			</div>

			<div className="cardBtns">
				<button
					id="eventSaveBtn"
					onClick={() => (isSaved ? unsaveEvent(event.id) : saveEvent(event.id))}
					className={isSaved ? "saved" : ""}
				>
					<FaBookmark /> {isSaved ? "Unsave" : "I'm Interested!"}
				</button>

				<Link
					to={`/events/${event.id}`}
					id="eventDetailsBtn"
					className="button"
				>
					<FaNewspaper /> Details
				</Link>

				<button onClick={handleEdit}>Edit</button>

				<button onClick={handleDelete}>Delete</button>
			</div>
		</div>
	);
}
