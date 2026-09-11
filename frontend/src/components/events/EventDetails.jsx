import { useNavigate, useParams } from "react-router";
import { useEvents } from "../../utils/EventsContext.jsx";
import { formatDate, formatTimeRange, formatPrice } from "../../utils/eventUtils.js";
import Loader from "../Loader.jsx";
import ErrorMessage from "../ErrorMessage.jsx";
import { FaBookmark } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

export default function EventDetails({ events }) {
	const { eventId } = useParams();
	const { addEvent, removeEvent, isEvent } = useEvents();
	const { data, loading, error } = events;
	const navigate = useNavigate();

	if (loading) return <Loader />;
	if (error) return error && <ErrorMessage message={error} />;

	function handleBack() {
		window.history.length > 1 ? navigate(-1) : navigate("/events");
	}

	const event = data.find((event) => String(event.id) === eventId);
	if (!event) return navigate("/events");
	const isSavedEvent = isEvent(event.id);

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
						onClick={() => (isSavedEvent ? removeEvent(event.id) : addEvent(event.id))}
						className={isSavedEvent ? "saved" : ""}
					>
						<FaBookmark /> {isSavedEvent ? "Unsave" : "I'm Interested!"}
					</button>

					<button
						id="backBtn"
						className="button"
						onClick={handleBack}
					>
						<IoIosArrowBack /> Back
					</button>
				</div>
			</section>
		</main>
	);
}
