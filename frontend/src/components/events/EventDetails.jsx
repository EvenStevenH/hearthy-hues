import { useNavigate, useParams } from "react-router";
import { useEvents } from "../../utils/EventsContext.jsx";
import { formatDate, formatTimeRange, formatPrice } from "../../utils/eventUtils.js";
import Loader from "../Loader.jsx";
import ErrorMessage from "../ErrorMessage.jsx";
import { FaBookmark } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

export default function EventDetails() {
	const { eventId } = useParams();
	const navigate = useNavigate();
	const { events, loading, error, saveEvent, unsaveEvent, isSavedEvent, deleteEvent } = useEvents();

	async function handleDelete() {
		await deleteEvent(event.id);
		navigate("/events");
	}

	const handleEdit = () => {
		navigate(`/events/${event.id}/edit`);
	};

	function handleBack() {
		window.history.length > 1 ? navigate(-1) : navigate("/events");
	}

	const event = events.find((event) => String(event.id) === eventId);
	if (!event) return navigate("/events");
	const isSaved = isSavedEvent(event.id);

	if (loading) return <Loader />;
	if (error) return error && <ErrorMessage message={error} />;

	return (
		<main className="container eventDetails">
			<img
				src={event.img.url}
				alt={event.img.alt}
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
						<FaBookmark /> {isSaved ? "Unsave" : "I'm Interested!"}
					</button>

					<button
						id="backBtn"
						className="button"
						onClick={handleBack}
					>
						<IoIosArrowBack /> Back
					</button>

					<button onClick={handleEdit}>Edit</button>

					<button onClick={handleDelete}>Delete</button>
				</div>
			</section>
		</main>
	);
}
