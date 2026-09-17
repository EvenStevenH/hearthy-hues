import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./hooks.js";
import { fetchAllEvents, createEvent as apiCreateEvent, updateEvent as apiUpdateEvent, deleteEvent as apiDeleteEvent, fetchOneEvent as apiFetchOneEvent } from "./eventApi.js";
import { events as localEventData } from "../data/events.js";

const EventsContext = createContext();

export function EventsProvider({ children }) {
	// start with a few events
	const [savedEvents, setSavedEvents] = useLocalStorage("savedEvents", [1783457854133, 1783457854139, 1783457854131]);

	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		async function loadEvents() {
			try {
				setLoading(true);
				setError(null);
				const data = await fetchAllEvents();
				setEvents(data);
			} catch (error) {
				console.error(error);
				setEvents(localEventData); // local data
				setError(null);
			} finally {
				setLoading(false);
			}
		}
		loadEvents();
	}, []);

	async function fetchOneEvent(id) {
		return apiFetchOneEvent(id);
	}

	async function createEvent(event) {
		const newEvent = await apiCreateEvent(event);
		setEvents((prev) => [...prev, newEvent]);
		return newEvent;
	}

	async function updateEvent(id, event) {
		const updatedEvent = await apiUpdateEvent(id, event);
		setEvents((prev) => prev.map((item) => (String(item.id) === String(id) ? updatedEvent : item)));
		return updatedEvent;
	}

	async function deleteEvent(id) {
		await apiDeleteEvent(id);
		setEvents((prev) => prev.filter((item) => String(item.id) !== String(id)));
		unsaveEvent(id);
	}

	function unsaveEvent(id) {
		return setSavedEvents((prev) => prev.filter((fav) => fav !== id));
	}

	function saveEvent(id) {
		return setSavedEvents((prev) => [...prev, id]);
	}

	return (
		<EventsContext.Provider
			value={{
				events,
				loading,
				error,
				fetchOneEvent,
				createEvent,
				updateEvent,
				deleteEvent,
				savedEvents,
				saveEvent,
				unsaveEvent,
				isSavedEvent: (id) => savedEvents.includes(id),
			}}
		>
			{children}
		</EventsContext.Provider>
	);
}

export function useEvents() {
	return useContext(EventsContext);
}
