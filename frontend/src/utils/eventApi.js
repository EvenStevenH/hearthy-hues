const API_URL = "http://localhost:8080/api/events";

export async function fetchAllEvents() {
	const response = await fetch(API_URL);
	if (!response.ok) throw new Error(`Error Status: ${response.status}. Failed to fetch events.`);
	return response.json();
}

export async function fetchOneEvent(id) {
	const response = await fetch(`${API_URL}/${id}`);
	if (!response.ok) throw new Error(`Error Status: ${response.status}. Failed to fetch event.`);
	return response.json();
}

export async function createEvent(event) {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(event),
	});
	if (!response.ok) throw new Error(`Error Status: ${response.status}. Failed to create event.`);
	return response.json();
}

export async function updateEvent(id, event) {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(event),
	});
	if (!response.ok) throw new Error(`Error Status: ${response.status}. Failed to update event.`);
	return response.json();
}

export async function deleteEvent(id) {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "DELETE",
	});
	if (!response.ok) throw new Error(`Error Status: ${response.status}. Failed to delete event.`);
}
