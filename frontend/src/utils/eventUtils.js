import { eventImages } from "../data/images.js";

export function getEventImage(imageKey) {
	return eventImages[imageKey] ?? eventImages.coffee;
}

export function formatTimeRange(startDate, endDate) {
	const options = {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	};
	const startTime = new Date(startDate).toLocaleTimeString("en-US", options);
	const endTime = new Date(endDate).toLocaleTimeString("en-US", options);
	return `${startTime} – ${endTime}`;
}

export function formatTime(date) {
	const options = {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	};
	const time = new Date(date).toLocaleTimeString("en-US", options);
	return `${time}`;
}

export function formatDate(startDate, weekday, month) {
	const options = {
		weekday: weekday || "long",
		year: "numeric",
		month: month || "long",
		day: "numeric",
	};
	return new Date(startDate).toLocaleDateString("en-US", options);
}

export function getCurrentYear() {
	return new Date().getFullYear();
}

export function getCurrentDateTime() {
	const now = new Date();
	const offset = now.getTimezoneOffset();
	const localDate = new Date(now.getTime() - offset * 60 * 1000);
	return localDate.toISOString().slice(0, 16);
}

export function sortByStartDate(a, b, date) {
	return new Date(a[date]).getTime() - new Date(b[date]).getTime();
}

export function formatPrice(price) {
	return price ? `$${price}` : "Free";
}

export function getFilteredEvents(events, filters) {
	const now = new Date();
	const start = filters.dateStart ? new Date(filters.dateStart) : null;
	const end = filters.dateEnd ? new Date(filters.dateEnd) : null;
	const min = parseFloat(filters.priceMin);
	const max = parseFloat(filters.priceMax);

	return events.filter((e) => {
		if (start && new Date(e.startDate) < start) return false;
		if (end && new Date(e.startDate) > end) return false;
		if (filters.hidePastEvents === "active" && new Date(e.startDate) <= now) return false;
		if (filters.hidePastEvents === "inactive" && new Date(e.startDate) > now) return false;
		if (filters.selectedTag && !e.tags?.includes(filters.selectedTag)) return false;
		if (!isNaN(min) && e.price < min) return false;
		if (!isNaN(max) && e.price > max) return false;
		return true;
	});
}
