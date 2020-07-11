import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Base from "../Base";
import { getQuestion } from "../helpers/common/forum_api_calls";
// moment
import moment from "moment";
// loader
import Loader from "react-loader-spinner";

const FullQuestion = () => {
	const [question, setQuestion] = useState({});
	const { qid } = useParams();
	const [loading, setLoading] = useState(true);
	const [msg, setMsg] = useState("");

	useEffect(() => {
		getQuestion(qid)
			.then((data) => {
				if (data.error) {
					setMsg(data.error);
					setLoading(false);
				} else {
					setQuestion(data);
					setLoading(false);
				}
			})
			.catch((err) => {
				setMsg(err);
				setLoading(false);
			});
	}, [qid]);

	return (
		<Base>
			{loading ? (
				<div style={{ textAlign: "center", marginTop: "10vh" }}>
					<Loader
						type="Bars"
						color="#001133"
						height={50}
						width={50}
						timeout={3000} //3 secs
					/>
				</div>
			) : (
				<React.Fragment>
					<h2>Question</h2>
					<div className="qcard">
						<div className="qcard-meta-wrapper">
							<span className="quimg">{question.user_id.name[0]}</span>
							<div className="qcard-meta">
								<h4>{question.user_id.name}</h4>
								<div className="qcard-meta-inner">
									<div>
										<span className="qcat">#{question.category.name}</span>
										<span className="qdate">
											{moment(question.createdAt).format(
												"MMMM Do YYYY h:mm:ss a"
											)}
										</span>
									</div>
									<span className="qdate">
										{moment(question.createdAt).isSame(question.updatedAt)
											? ""
											: "edited"}
									</span>
								</div>
							</div>
						</div>
						<pre className="qcard-ques">{question.content}</pre>
					</div>
					<div>{msg}</div>
					<h2>Answers</h2>
					<div>
						{question.answers.map((ans, i) => (
							<div key={i} className="qcard">
								<div className="qcard-meta-wrapper">
									<span className="quimg">{ans.user_id[0]}</span>
									<div className="qcard-meta">
										<h4>{ans.user_id}</h4>
										<div className="qcard-meta-inner">
											<div>
												<span className="qdate" style={{ marginLeft: "0" }}>
													{moment(ans.createdAt).format(
														"MMMM Do YYYY h:mm:ss a"
													)}
												</span>
											</div>
											<span className="qdate">
												{moment(ans.createdAt).isSame(ans.updatedAt)
													? ""
													: "edited"}
											</span>
										</div>
									</div>
								</div>
								<pre className="qcard-ques">{ans.content}</pre>
							</div>
						))}
					</div>
				</React.Fragment>
			)}
		</Base>
	);
};

export default FullQuestion;
