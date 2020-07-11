import React, { useState } from "react";
import Base from "../Base";
import { useHistory } from "react-router-dom";
import { isAuthenticated, signup } from "../helpers/auth/auth_api_calls";

const SignUp = () => {
	const history = useHistory();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");

	const handleSubmit = () => {
		signup({ name, email, password })
			.then((r) => r.json())
			.then((d) => {
				setMsg(JSON.stringify(d));
				setTimeout(() => {
					if (isAuthenticated()) {
						history.push("/signin");
					}
				}, 2000);
			})
			.catch((err) => {
				setMsg(err);
			});
	};

	return (
		<Base>
			<h2>SIGN UP</h2>
			<input
				onChange={(e) => {
					setName(e.target.value);
				}}
				placeholder="NAME"
				type="text"
			/>
			<input
				onChange={(e) => {
					setEmail(e.target.value);
				}}
				placeholder="EMAIL"
				type="email"
			/>
			<input
				onChange={(e) => {
					setPassword(e.target.value);
				}}
				placeholder="PASSWORD"
				type="password"
			/>
			<button onClick={handleSubmit}>SIGN UP</button>
			<div>{msg}</div>
		</Base>
	);
};

export default SignUp;
