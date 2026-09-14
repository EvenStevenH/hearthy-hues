import Logo from "./Logo";
import { NavLink, useNavigate } from "react-router";
import { GoHomeFill } from "react-icons/go";
import { FaRegCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineTransitEnterexit } from "react-icons/md";

export default function Header({ menuOpen, setMenuOpen, setIsLoggedIn }) {
	const navigate = useNavigate();

	function handleLogout() {
		setIsLoggedIn(false);
		navigate("/login");
	}

	return (
		<>
			<header>
				<Logo color="light" />

				<button
					id="menu-toggle"
					aria-label="toggle navigation menu"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					&#9776;
				</button>
			</header>

			<nav className={menuOpen ? "open" : ""}>
				<NavLink to="/dashboard">
					<GoHomeFill className="navIcon" /> Dashboard
				</NavLink>
				<NavLink to="/events">
					<FaRegCalendarAlt className="navIcon" /> Events
				</NavLink>
				<NavLink to="/user">
					<CgProfile className="navIcon" /> Your Profile
				</NavLink>

				<NavLink
					className="navBottom"
					to="/about"
				>
					<FaInfoCircle className="navIcon" /> About
				</NavLink>
				<NavLink
					to="/login"
					onClick={handleLogout}
				>
					<MdOutlineTransitEnterexit className="navIcon" /> Log Out
				</NavLink>
			</nav>
		</>
	);
}
