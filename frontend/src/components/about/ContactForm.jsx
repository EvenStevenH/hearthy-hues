import { useState } from "react";
import { IoSend } from "react-icons/io5";

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		reasonForContact: "",
		subject: "",
		message: "",
	});
	const [formMsg, setFormMsg] = useState("");
	const isFormValid = formData.name && formData.email && formData.message;

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setFormMsg("This is a mock form. Submissions won't go anywhere!");
	}

	function handleForm(event) {
		event.preventDefault();

		if (isFormValid) {
			setFormData({
				name: "",
				email: "",
				reasonForContact: "",
				subject: "",
				message: "",
			});
			setFormMsg('Thanks for your "message", traveler!');
		} else {
			return setFormMsg("Please complete all required fields.");
		}
	}

	return (
		<form
			className="contactForm"
			onSubmit={handleForm}
		>
			<div className="contactFormTop">
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Your name"
						required
					/>
				</div>

				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Your email address"
						required
					/>
				</div>
			</div>

			<div>
				<label htmlFor="reasonForContact">Reason for Contact:</label>
				<select
					id="reasonForContact"
					name="reasonForContact"
					value={formData.reasonForContact}
					onChange={handleChange}
					required
				>
					<option
						value=""
						disabled
					>
						Select a Reason
					</option>
					<option value="inquiry">Inquiries</option>
					<option value="bug-report">Bug Report</option>
					<option value="support-request">Support Request</option>
					<option value="other">Other</option>
				</select>
			</div>

			<div>
				<label htmlFor="subject">Subject:</label>
				<input
					type="text"
					id="subject"
					name="subject"
					value={formData.subject}
					onChange={handleChange}
					placeholder="Enter subject here..."
					required
				/>
			</div>

			<div className="messageField">
				<label htmlFor="message">Message:</label>
				<textarea
					id="message"
					name="message"
					rows="5"
					value={formData.message}
					onChange={handleChange}
					maxLength="500"
					placeholder="Enter your message here..."
					required
				/>
				<div id="character-counter">{`${formData.message.length} / 500 characters`}</div>
			</div>

			<button
				id="submitBtn"
				type="submit"
			>
				<IoSend /> Submit
			</button>

			{formMsg && <p id="formMsg">{formMsg}</p>}
		</form>
	);
}
