import { useEffect, useState } from "react";

export function useFetch(url) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!url) return;

		async function fetchData() {
			try {
				setLoading(true); // show loading before fetching
				setError(null); // clear any previous errors

				let data;
				if (typeof url === "object") {
					data = url; // object from local file
				} else if (url.endsWith(".js")) {
					data = await import(/* @vite-ignore */ url);
				} else {
					const response = await fetch(url);
					if (!response.ok) {
						throw new Error("Unable to retrieve data.");
					}
					data = await response.json();
				}
				setData(data);
			} catch (error) {
				setError(error.message);
				console.error(error);
			} finally {
				setLoading(false); // hide loading when done
			}
		}
		fetchData();
	}, [url]);

	return { data, loading, error };
}

export function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		try {
			const stored = localStorage.getItem(key);
			return stored
				? JSON.parse(stored) // existing data
				: initialValue; // default if nothing found
		} catch {
			return initialValue;
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
}
