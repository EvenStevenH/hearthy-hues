import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import { useFetch } from "../../utils/hooks";
import UserCard from "./UserCard";
import { user as userData, friends as friendsData } from "../../data/user.js";

export default function UserPage() {
	const user = useFetch(userData);
	const friends = useFetch(friendsData);
	if (user.loading || friends.loading) return <Loader />;
	if (user.error || friends.error)
		return (
			<>
				<ErrorMessage message={user.error} />;
				<ErrorMessage message={friends.error} />;
			</>
		);

	return (
		<main>
			<h1>{user.data.username}'s Profile</h1>

			<section className="userPage">
				<section className="userInfo">
					<UserCard
						user={user.data}
						type="user"
					/>
				</section>

				<section className="userFriends">
					<h2>Your Friends</h2>

					{friends.data.length ? (
						<section className="friends">
							{friends.data.map((friend) => (
								<UserCard
									user={friend}
									type="friend"
									key={friend.userId}
								/>
							))}
						</section>
					) : (
						<p className="emptyMsg">No friends available.</p>
					)}
				</section>
			</section>
		</main>
	);
}
