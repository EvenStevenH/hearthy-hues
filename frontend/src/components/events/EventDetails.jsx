import { useNavigate, useParams } from "react-router";
import { useEvents } from "../../utils/EventsContext.jsx";
import { formatDate, formatTimeRange, formatPrice } from "../../utils/eventUtils.js";
import Loader from "../Loader.jsx";
import ErrorMessage from "../ErrorMessage.jsx";
import { FaBookmark } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { getEventImage } from "../../utils/eventUtils.js";

export default function EventDetails() {
	const { eventId } = useParams();
	const navigate = useNavigate();
	const { events, loading, error, isOffline, saveEvent, unsaveEvent, isSavedEvent, deleteEvent } = useEvents();

	async function handleDelete() {
		if (isOffline) return;
		await deleteEvent(event.id);
		navigate("/events");
	}

	const handleEdit = () => {
		if (isOffline) return;
		navigate(`/events/${event.id}/edit`);
	};

	function handleBack() {
		window.history.length > 1 ? navigate(-1) : navigate("/events");
	}

	const event = events.find((event) => String(event.id) === eventId);
	if (!event) return navigate("/events");
	const isSaved = isSavedEvent(event.id);
	const image = getEventImage(event.img);

	if (loading) return <Loader />;
	if (error) return error && <ErrorMessage message={error} />;

	return (
		<main className="container eventDetails">
			<img
				src={event.img.url || image.url}
				alt={event.img.alt || image.alt || `Image for ${event.title}`}
				id="eventImg"
			/>

			<section className="cardDetails">
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
					<h1 className="title">{event.title}</h1>
					<p className="description">{event.description}</p>
				</div>

				<div>
					<p className="price">{formatPrice(event.price)}</p>
					<p className="date">
						{formatDate(event.startDate)} | {formatTimeRange(event.startDate, event.endDate)}
					</p>
					<p className="location">{event.location}</p>
				</div>

				<div>
					<p>
						<span className="notes">{event.notes}</span>
					</p>
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
						id="backBtn"
						onClick={handleBack}
					>
						Back <IoIosArrowBack />
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
			</section>
		</main>
	);
}
