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
