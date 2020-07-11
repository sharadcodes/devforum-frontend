import React, { useState } from "react";
import { authenticate, signin } from "../helpers/auth/auth_api_calls";
import Base from "../Base";
import { useHistory } from "react-router-dom";

const SignIn = () => {
	const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");

	const handleSubmit = () => {
		signin({ email, password })
			.then((data) => {
				if (data.err) {
					setMsg(JSON.stringify(data));
				} else {
					authenticate(data, () => {
						history.push("/");
					});
				}
			})
			.catch((err) => {
				setMsg(JSON.stringify(err));
			});
	};

	return (
		<Base>
			<h2>SIGN IN</h2>
			<input
				onChange={(e) => {
					setEmail(e.target.value);
				}}
				placeholder="EMAIL"
				type="email"
				value={email}
			/>
			<input
				onChange={(e) => {
					setPassword(e.target.value);
				}}
				placeholder="PASSWORD"
				type="password"
				value={password}
			/>
			<button onClick={handleSubmit}>SIGN IN</button>
			<div>{msg}</div>
		</Base>
	);
};

export default SignIn;
