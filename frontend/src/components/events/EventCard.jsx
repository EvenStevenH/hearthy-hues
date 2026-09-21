import { formatDate, formatTimeRange, getCurrentDateTime } from "../../utils/eventUtils.js";
import { useEvents } from "../../utils/EventsContext.jsx";
import { useNavigate } from "react-router";
import { FaBookmark, FaNewspaper } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { getEventImage } from "../../utils/eventUtils.js";

export default function EventCard({ event }) {
	const { isOffline, saveEvent, unsaveEvent, isSavedEvent, deleteEvent } = useEvents();
	const navigate = useNavigate();
	const isSaved = isSavedEvent(event.id);
	const isPastEvent = event.startDate < getCurrentDateTime();
	const image = getEventImage(event.img);

	async function handleDelete() {
		if (isOffline) return;
		await deleteEvent(event.id);
		navigate("/events");
	}

	const handleEdit = () => {
		if (isOffline) return;
		navigate(`/events/${event.id}/edit`);
	};

	const handleViewDetails = () => {
		navigate(`/events/${event.id}`);
	};

	return (
		<div className={`container card eventCard ${isPastEvent ? "pastEvent" : ""}`}>
			<img
				src={event.img.url || image.url}
				alt={event.img.alt || image.alt || `Image for ${event.title}`}
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
					{isSaved ? "Unsave" : "Save"} <FaBookmark />
				</button>

				<button
					onClick={handleViewDetails}
					id="eventDetailsBtn"
				>
					Details <FaNewspaper />
				</button>

				<button
					id="eventEditBtn"
					onClick={handleEdit}
				>
					Edit <MdEdit />
				</button>

				<button
					id="eventDeleteBtn"
					onClick={handleDelete}
				>
					Delete <FaRegTrashAlt />
				</button>
			</div>
		</div>
	);
}
