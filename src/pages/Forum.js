import React, { useState, useEffect } from "react";
import Base from "../Base";
import Question from "./Question";
import { isAuthenticated } from "../helpers/auth/auth_api_calls";
import { getAllQuestions } from "../helpers/common/forum_api_calls";

const Forum = () => {
	const [questions, setQuestions] = useState([]);
	const [msg, setMsg] = useState("");

	function getQuestions() {
		getAllQuestions()
			.then((data) => {
				if (data.error) setMsg(JSON.parse(data.error));
				else setQuestions(data);
			})
			.catch((err) => setMsg(JSON.parse(err)));
	}

	useEffect(() => {
		getQuestions();
	}, []);

	return (
		<Base>
			<div>
				<h2>FORUM</h2>
				{isAuthenticated() && <Question />}
				{msg}
			</div>
			<h3>Questions</h3>
			<div>
				{questions.map((q, i) => {
					return (
						<div
							key={i}
							style={{
								boxShadow: "0px 5px 15px 0px rgba(0,0,0,0.2)",
								padding: "20px",
								marginBottom: "20px",
								borderRadius: "10px",
							}}
						>
							<span
								style={{
									display: "inline-block",
								}}
							>
								<span
									style={{
										width: "50px",
										height: "50px",
										background: "yellow",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										borderRadius: "100%",
										fontSize: "30px",
									}}
								>
									{q.user_id.name[0]}
								</span>
							</span>
							<span
								style={{
									display: "inline-block",
									marginLeft: "10px",
								}}
							>
								{q.user_id.name}
							</span>
							<span
								style={{
									display: "block",
									padding: "20px 0"
								}}
							>
								<span
									style={{
										background: "#ccc",
										color: "#323232",
										padding: "5px",
										fontSize: "10px"
									}}
								>
									#{q.category.name}
								</span>
							</span>
							<pre style={{ color: "#323232" }}>{q.content}</pre>
						</div>
					);
				})}
			</div>
		</Base>
	);
};

export default Forum;
