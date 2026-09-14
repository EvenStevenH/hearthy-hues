import icon_dark from "../assets/icons/icon_dark.svg";
import icon_light from "../assets/icons/icon_light.svg";

export default function Logo({ id, color }) {
	return (
		<div
			className={"logo"}
			id={`${id}`}
		>
			<img
				src={color === "dark" ? icon_dark : icon_light}
				alt="logo"
				className="logoImg"
			/>
			<p className="logoText">Hearthy Hue</p>
		</div>
	);
}
