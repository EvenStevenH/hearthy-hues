import { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import EventCard from "./EventCard";
import { sortByStartDate, getFilteredEvents } from "../../utils/eventUtils";
import { useEvents } from "../../utils/EventsContext";
import { Link } from "react-router";
import { MdEdit } from "react-icons/md";
import { FaRedo } from "react-icons/fa";

const noFilters = {
	dateStart: "",
	dateEnd: "",
	hidePastEvents: "all",
	selectedTag: "",
	priceMin: "",
	priceMax: "",
};

export default function EventsPage() {
	const { events, loading, error } = useEvents();
	const [filters, setFilters] = useState(noFilters);

	const handleFilterChange = (e) => {
		setFilters((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const resetFilters = () => {
		setFilters(noFilters);
	};

	const availableTags = [...new Set(events.flatMap((e) => e.tags || []))].sort();
	const displayedEvents = getFilteredEvents(events, filters).sort((a, b) => sortByStartDate(a, b, "startDate"));

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

			<h2>Filters</h2>

			<section className="filterSection">
				<div>
					<label htmlFor="dateStart">Start Date:</label>
					<input
						type="datetime-local"
						id="dateStart"
						name="dateStart"
						value={filters.dateStart}
						onChange={handleFilterChange}
					/>
				</div>

				<div>
					<label htmlFor="dateEnd">End Date:</label>
					<input
						type="datetime-local"
						id="dateEnd"
						name="dateEnd"
						value={filters.dateEnd}
						onChange={handleFilterChange}
					/>
				</div>

				<div>
					<label htmlFor="hidePastEvents">Event Status:</label>
					<select
						id="hidePastEvents"
						name="hidePastEvents"
						value={filters.hidePastEvents}
						onChange={handleFilterChange}
					>
						<option value="all">All Events</option>
						<option value="active">Upcoming Only</option>
						<option value="inactive">Past Only</option>
					</select>
				</div>

				<div>
					<label htmlFor="selectedTag">Tag:</label>
					<select
						id="selectedTag"
						name="selectedTag"
						value={filters.selectedTag}
						onChange={handleFilterChange}
					>
						<option value="">All Tags</option>
						{availableTags.map((tag) => (
							<option
								key={tag}
								value={tag}
							>
								{tag}
							</option>
						))}
					</select>
				</div>

				<div>
					<label htmlFor="priceMin">Min Price:</label>
					<input
						type="number"
						id="priceMin"
						name="priceMin"
						min="0"
						value={filters.priceMin}
						onChange={handleFilterChange}
						placeholder="0"
					/>
				</div>

				<div>
					<label htmlFor="priceMax">Max Price:</label>
					<input
						type="number"
						id="priceMax"
						name="priceMax"
						min="0"
						value={filters.priceMax}
						onChange={handleFilterChange}
						placeholder="0"
					/>
				</div>

				<button
					type="button"
					onClick={resetFilters}
					id="resetFiltersBtn"
				>
					Reset <FaRedo />
				</button>
			</section>

			{displayedEvents.length ? (
				<section className="grid gridEvents">
					{displayedEvents.map((event) => (
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
