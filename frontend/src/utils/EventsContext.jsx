import { createContext, useContext } from "react";
import { useLocalStorage } from "./hooks.js";

const EventsContext = createContext();

export function EventsProvider({ children }) {
	// start with a few events
	const [savedEvents, setSavedEvents] = useLocalStorage("savedEvents", [1783457854133, 1783457854139, 1783457854131]);

	return (
		<EventsContext.Provider
			value={{
				savedEvents,
				addEvent: (id) => setSavedEvents((prev) => [...prev, id]),
				removeEvent: (id) => setSavedEvents((prev) => prev.filter((fav) => fav !== id)),
				isEvent: (id) => savedEvents.includes(id),
			}}
		>
			{children}
		</EventsContext.Provider>
	);
}

export function useEvents() {
	return useContext(EventsContext);
}
