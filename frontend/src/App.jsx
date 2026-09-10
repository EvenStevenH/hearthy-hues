import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import About from "./components/about/About.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import UserPage from "./components/user/UserPage.jsx";
import EventsPage from "./components/events/EventsPage.jsx";
import EventDetails from "./components/events/EventDetails.jsx";
import AnimatedRoutes from "./components/AnimatedRoutes.jsx";
import { AnimatePresence } from "framer-motion";
import { EventsProvider } from "./utils/EventsContext.jsx";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { useLocalStorage, useFetch } from "./utils/hooks";
import { useState } from "react";
import { events as eventsData } from "./data/events.js";

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
	const [menuOpen, setMenuOpen] = useState(false);
	const events = useFetch(eventsData);
	const location = useLocation();

	return (
		<>
			{isLoggedIn ? (
				<>
					<Header
						menuOpen={menuOpen}
						setMenuOpen={setMenuOpen}
						setIsLoggedIn={setIsLoggedIn}
					/>

					<div className="content">
						<EventsProvider>
							<AnimatePresence mode="wait">
								<Routes
									location={location}
									key={location.pathname}
								>
									<Route element={<AnimatedRoutes />}>
										<Route
											path="/dashboard"
											element={<Dashboard events={events} />}
										/>
										<Route
											path="/events"
											element={<EventsPage events={events} />}
										/>
										<Route
											path="/events/:eventId"
											element={<EventDetails events={events} />}
										/>
										<Route
											path="/user"
											element={<UserPage />}
										/>
										<Route
											path="/about"
											element={<About />}
										/>
									</Route>

									<Route
										path="*"
										element={<Navigate to="/dashboard" />}
									/>
								</Routes>
							</AnimatePresence>
						</EventsProvider>

						<Footer />
					</div>
				</>
			) : (
				<Routes>
					<Route
						path="/login"
						element={<Login setIsLoggedIn={setIsLoggedIn} />}
					/>
					<Route
						path="*"
						element={<Navigate to={"/login"} />}
					/>
				</Routes>
			)}
		</>
	);
}
