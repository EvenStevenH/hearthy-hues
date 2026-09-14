import { formatDate, formatTime } from "../../utils/eventUtils";

export default function PostCard({ post }) {
	return (
		<div className="postCard">
			{post.img && (
				<img
					src={post.img.url}
					alt={post.img.alt}
					id="postImg"
				/>
			)}

			<div className="postContent">
				<div className="postHeader">
					<h4>{post.userName}</h4>

					<p className="postDate">
						{formatDate(post.timestamp, "short", "short")} | {formatTime(post.timestamp)}
					</p>
				</div>

				<p className="postCaption">{post.caption}</p>

				<details className="postStats">
					<summary>
						{post.likes} Likes | {post.comments.length} Comments
					</summary>
					{post.comments.length ? (
						post.comments.map((comment, timestamp) => (
							<div
								key={timestamp}
								className="comment"
							>
								<p>
									<strong>{comment.userName}</strong>: {comment.text}
								</p>
								<p>
									{formatDate(post.timestamp, "short", "short")} | {formatTime(comment.timestamp)}
								</p>
							</div>
						))
					) : (
						<p>No comments yet.</p>
					)}
				</details>
			</div>
		</div>
	);
}
