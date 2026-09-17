import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEvents } from "../../utils/EventsContext.jsx";
import Loader from "../Loader.jsx";
import ErrorMessage from "../ErrorMessage.jsx";
import { getCurrentDateTime } from "../../utils/eventUtils.js";

export const tags = ["comics", "convention", "crafts", "exhibition", "festival", "film", "market", "open studio", "painting", "performance", "photography", "sculpture", "social", "talks", "tour", "workshop"];

function getEmptyEvent() {
	return {
		title: "",
		description: "",
		startDate: getCurrentDateTime(),
		endDate: getCurrentDateTime(),
		location: "",
		notes: "",
		img: "",
		price: 0,
		tags: [],
		organizer: {
			id: 1,
		},
	};
}

export default function EventFormPage() {
	const { eventId } = useParams();
	const navigate = useNavigate();
	const { createEvent, updateEvent, fetchOneEvent } = useEvents();
	const isEditing = Boolean(eventId);
	const [formData, setFormData] = useState(getEmptyEvent);
	const [loading, setLoading] = useState(isEditing);
	const [error, setError] = useState(null);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (!isEditing) return;

		async function loadEvent() {
			try {
				const data = await fetchOneEvent(eventId);
				setFormData({
					...getEmptyEvent(),
					...data,
				});
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}
		loadEvent();
	}, [eventId, isEditing, fetchOneEvent]);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((current) => ({
			...current,
			[name]: value,
		}));
	}

	function handleTagChange(event) {
		const { value, checked } = event.target;
		setFormData((current) => ({
			...current,
			tags: checked ? [...current.tags, value] : current.tags.filter((tag) => tag !== value),
		}));
	}

	function validateForm() {
		const errors = {};
		if (!formData.title.trim()) errors.title = "Title is required.";
		if (!formData.startDate) errors.startDate = "Start date is required.";
		if (!formData.endDate) errors.endDate = "End date is required.";
		if (!formData.location.trim()) errors.location = "Location is required.";
		if (formData.price !== "" && Number(formData.price) < 0) errors.price = "Price cannot be negative.";
		if (formData.startDate && formData.endDate && new Date(formData.endDate) < new Date(formData.startDate)) {
			errors.endDate = "End date must be the same as or after the start date.";
		}
		setErrors(errors);
		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		if (!validateForm()) return;

		try {
			const eventData = { ...formData };
			let savedEvent;
			if (isEditing) {
				savedEvent = await updateEvent(eventId, eventData);
			} else {
				savedEvent = await createEvent(eventData);
			}
			navigate(`/events/${savedEvent.id}`);
		} catch (error) {
			setError(error.message);
		}
	}

	function handleCancel() {
		return isEditing ? navigate(`/events/${eventId}`) : navigate("/events");
	}

	if (loading) return <Loader />;
	if (error) return <ErrorMessage message={error} />;

	return (
		<main className="container eventFormPage">
			<h1>{isEditing ? "Edit Event" : "Create Event"}</h1>

			<form
				onSubmit={handleSubmit}
				className="eventForm"
			>
				<div>
					<label htmlFor="title">Title</label>
					<input
						id="title"
						name="title"
						type="text"
						value={formData.title}
						onChange={handleChange}
						placeholder="Event title"
						required
					/>
					{errors.title && <p className="formError">{errors.title}</p>}
				</div>

				<div>
					<label htmlFor="description">Description</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Enter event description..."
					/>
				</div>

				<div>
					<div>
						<label htmlFor="startDate">Start</label>
						<input
							id="startDate"
							name="startDate"
							type="datetime-local"
							value={formData.startDate}
							onChange={handleChange}
							required
						/>
						{errors.startDate && <p className="formError">{errors.startDate}</p>}
					</div>

					<div>
						<label htmlFor="endDate">End</label>
						<input
							id="endDate"
							name="endDate"
							type="datetime-local"
							value={formData.endDate}
							onChange={handleChange}
							required
						/>
						{errors.endDate && <p className="formError">{errors.endDate}</p>}
					</div>
				</div>

				<div>
					<label htmlFor="location">Location</label>
					<input
						id="location"
						name="location"
						type="text"
						value={formData.location}
						onChange={handleChange}
						placeholder="Enter a location..."
						required
					/>
					{errors.location && <p className="formError">{errors.location}</p>}
				</div>

				<div>
					<label htmlFor="price">Price</label>
					<input
						id="price"
						name="price"
						type="number"
						min="0"
						step="0.01"
						value={formData.price}
						onChange={handleChange}
						placeholder="0"
					/>
					{errors.price && <p className="formError">{errors.price}</p>}
				</div>

				<div>
					<label htmlFor="img">Image</label>
					<select
						id="img"
						name="img"
						value={formData.img}
						onChange={handleChange}
					>
						<option value="">Select an image</option>
					</select>
					{errors.img && <p className="formError">{errors.img}</p>}
				</div>

				<fieldset>
					<legend>Tags</legend>
					<div className="eventFormTags">
						{tags.map((tag) => (
							<label key={tag}>
								<input
									type="checkbox"
									value={tag}
									checked={formData.tags.includes(tag)}
									onChange={handleTagChange}
								/>
								{tag}
							</label>
						))}
					</div>
				</fieldset>

				<div>
					<label htmlFor="notes">Notes</label>
					<textarea
						id="notes"
						name="notes"
						value={formData.notes}
						onChange={handleChange}
						placeholder="Enter optional notes..."
					/>
				</div>

				<div className="eventFormActions">
					<button
						id="submitBtn"
						type="submit"
					>
						{isEditing ? "Save Changes" : "Create Event"}
					</button>

					<button
						id="cancelBtn"
						type="button"
						onClick={handleCancel}
					>
						Cancel
					</button>
				</div>
			</form>
		</main>
	);
}
