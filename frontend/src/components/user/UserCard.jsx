import { userImages as images } from "../../data/images";
import { MdMessage } from "react-icons/md";
import { FaLink } from "react-icons/fa";

export default function UserCard({ user, type = "user" }) {
	return (
		<div
			className={`container card`}
			id={`${type}Card`}
		>
			<img
				src={user.profileImg?.url || images.defaultProfileImg.url}
				alt={`${user.username}'s avatar`}
				id="userImg"
			/>

			<div className="userDetails">
				<div>
					<h4 className="title">{user.username}</h4>

					<p className="subtitle">
						<span id="tagline">{user.tagline}</span>
					</p>

					<div className="userFollowStats">
						<p>
							<b>Followers</b>: {user.followers}
						</p>
						<p>
							<b>Following</b>: {user.following}
						</p>
						<p>
							<b>Posts</b>: {user.postCount}
						</p>
					</div>

					<p className="bio">{user.bio}</p>
				</div>

				<div className="profileBtns">
					<a
						href={user.website}
						target="_blank"
						className="button"
						id="profileLinkBtn"
					>
						Website <FaLink />
					</a>

					{type === "friend" && (
						<button id="profileMsgBtn">
							Message <MdMessage />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
