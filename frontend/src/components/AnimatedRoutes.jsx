import { Outlet } from "react-router";
import { motion } from "framer-motion";

export default function AnimatedLayout() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -12 }}
			transition={{ duration: 0.25 }}
			style={{ margin: "auto", width: "fit-content" }}
		>
			<Outlet />
		</motion.div>
	);
}
