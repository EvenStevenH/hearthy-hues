import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { eventImages } from "./../data/images";
import Logo from "./Logo";

export default function Login({ setIsLoggedIn }) {
	const validEmail = "steven@email.com";
	const validPassword = "grilledCheese";

	const [email, setEmail] = useState(validEmail);
	const [password, setPassword] = useState(validPassword);
	const [loginMsg, setLoginMsg] = useState("");
	const navigate = useNavigate();

	function handleLogin(event) {
		event.preventDefault();

		if (email === validEmail && password === validPassword) {
			setIsLoggedIn(true);
			setLoginMsg("");
			navigate("/dashboard");
		} else {
			return setLoginMsg(<p>Invalid email or password!</p>);
		}
	}

	function handleRegister() {
		return setLoginMsg(
			<>
				<p>Thanks for your interest! For this demo, please use these credentials:</p>
				<div className="credentials">
					<p>
						<b>Email</b>: steven@email.com
					</p>
					<p>
						<b>Password</b>: grilledCheese
					</p>
				</div>
			</>,
		);
	}

	return (
		<main className="loginPage">
			<div className="leftPane">
				<Logo
					id="logoLoginLeft"
					color="light"
				/>
				<img
					className="loginBg"
					src={eventImages.studio.url}
					alt={eventImages.studio.alt}
				/>
			</div>

			<div className="rightPane">
				<section className="loginPanel">
					<Logo
						id="logoLoginRight"
						color="dark"
					/>

					<div className="loginTop">
						<h1>Welcome back, traveler!</h1>
						<p>Let's find some cozy new events.</p>
					</div>

					<form onSubmit={handleLogin}>
						<div>
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								name="email"
								id="email"
								onChange={(e) => setEmail(e.target.value)}
								placeholder="steven@email.com"
								value={email}
								required
							/>
						</div>

						<div>
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								name="password"
								id="password"
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••••••"
								value={password}
								required
							/>
						</div>

						<button
							type="submit"
							onClick={handleLogin}
							id="loginBtn"
						>
							Log In
						</button>
					</form>

					<p className="register">
						Don't have an account?{" "}
						<Link
							onClick={handleRegister}
							to="/login"
						>
							Register here
						</Link>
						!
					</p>

					{loginMsg && <div id="loginMsg">{loginMsg}</div>}
				</section>
			</div>
		</main>
	);
}
