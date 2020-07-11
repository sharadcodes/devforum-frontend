import React, { useState, useEffect } from "react";
import Base from "../Base";
import Question from "./Question";
import { isAuthenticated } from "../helpers/auth/auth_api_calls";
import { getAllQuestions } from "../helpers/common/forum_api_calls";
// moment
import moment from "moment";
// loader
import Loader from "react-loader-spinner";

const Forum = () => {
	const [questions, setQuestions] = useState([]);
	const [msg, setMsg] = useState("");
	const [loading, setLoading] = useState(true);

	function getQuestions() {
		setLoading(true);
		getAllQuestions()
			.then((data) => {
				if (data.error) {
					setMsg(JSON.parse(data.error));
					setLoading(false);
				} else {
					setQuestions(data);
					setLoading(false);
				}
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
			{loading && (
				<div style={{ textAlign: "center", marginTop: "10vh" }}>
					<Loader
						type="Bars"
						color="#001133"
						height={50}
						width={50}
						timeout={3000} //3 secs
					/>
				</div>
			)}
			<div>
				{questions.map((q, i) => {
					return (
						<div key={i} className="qcard">
							<div className="qcard-meta-wrapper">
								<span className="quimg">{q.user_id.name[0]}</span>
								<div className="qcard-meta">
									<h4>{q.user_id.name}</h4>
									<div className="qcard-meta-inner">
										<div>
											<span className="qcat">#{q.category.name}</span>
											<span className="qdate">
												{moment(q.createdAt).format("MMMM Do YYYY h:mm:ss a")}
											</span>
										</div>
										<span className="qdate">
											{moment(q.createdAt).isSame(q.updatedAt) ? "" : "edited"}
										</span>
									</div>
								</div>
							</div>
							<pre className="qcard-ques">{q.content}</pre>
						</div>
					);
				})}
			</div>
		</Base>
	);
};

export default Forum;
