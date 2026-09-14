import { postImages as images } from "./images";

export const feed = [
	{
		id: 1,
		type: "text",
		img: images.art1,
		caption: "Finished this new piece!",
		userId: 1,
		userName: "Steven",
		likes: 120,
		comments: [
			{
				timestamp: "2026-06-01T12:04:00",
				userId: 2,
				userName: "Samuel",
				text: "How delightful!",
			},
			{
				timestamp: "2026-06-01T14:26:00",
				userId: 3,
				userName: "Biko",
				text: "Delicious colors.",
			},
			{
				timestamp: "2026-06-01T18:24:00",
				userId: 4,
				userName: "Olivier",
				text: "Would totally get a print of this!",
			},
		],
		timestamp: "2026-06-01T12:00:00",
	},
	{
		id: 2,
		type: "text",
		img: images.painting1,
		caption: "Just a quick update on my progress.",
		userId: 2,
		userName: "Samuel",
		likes: 80,
		comments: [
			{
				timestamp: "2026-06-02T16:30:01",
				userId: 1,
				userName: "Steven",
				text: "Great work so far!",
			},
			{
				timestamp: "2026-06-02T18:02:02",
				userId: 3,
				userName: "Biko",
				text: "Can't wait to see this finished!",
			},
		],
		timestamp: "2026-06-02T15:30:00",
	},
	{
		id: 3,
		type: "text",
		img: images.animal1,
		caption: "Anybody have extra yellow ochre acrylic? The store and I ran out!",
		userId: 3,
		userName: "Biko",
		likes: 20,
		comments: [
			{
				timestamp: "2026-06-03T12:16:01",
				userId: 2,
				userName: "Samuel",
				text: "Can get you some next painting session!",
			},
		],
		timestamp: "2026-06-03T09:15:00",
	},
];
