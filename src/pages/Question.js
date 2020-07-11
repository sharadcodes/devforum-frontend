import React, { useState, useEffect } from "react";
import { createQuestion } from "../helpers/common/forum_api_calls";
import { getAllCategories } from "../helpers/admin/admin_api_calls";
// loader
import Loader from "react-loader-spinner";

const Question = ({ history }) => {
	const [categories, setCategories] = useState([]);
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [loading, setLoading] = useState(true);
	const [msg, setMsg] = useState("");

	useEffect(() => {
		setLoading(true);
		getAllCategories()
			.then((r) => r.json())
			.then((d) => {
				setCategories(d);
				setLoading(false);
			})
			.catch((err) => {
				setMsg(err);
				setLoading(false);
			});
	}, []);

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
	};

	const handleQuestionChange = (e) => {
		setContent(e.target.value);
	};

	const handleSubmit = () => {
		setLoading(true);
		setMsg("");
		createQuestion(content, category)
			.then((r) => r.json())
			.then((d) => {
				if (d.error) {
					setMsg(d.error.substr(0, 26));
					setLoading(false);
				} else {
					setMsg("Question asked :)");
					setLoading(false);
					window.location.reload(false);
				}
			})
			.catch((err) => {
				setMsg(JSON.stringify(err));
			});
	};

	return (
		<div
			style={{
				display: "grid",
				gridRowGap: "10px",
				margin: "auto",
			}}
		>
			{categories.length > 0 && (
				<React.Fragment>
					<br />
					<label>SELECT CATEGORY</label>
					<select value={category} onChange={handleCategoryChange}>
						{categories.map((c, i) => {
							return (
								<option key={i} value={c._id}>
									{c.name}
								</option>
							);
						})}
					</select>
					<textarea
						onChange={handleQuestionChange}
						value={content}
						rows="5"
					></textarea>
					<button onClick={handleSubmit}>ASK</button>
					{loading && (
						<div style={{ textAlign: "center", marginTop: "10vh" }}>
							<Loader
								type="Oval"
								color="#001133"
								height={50}
								width={50}
								timeout={3000} //3 secs
							/>
						</div>
					)}
					<div>{msg}</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default Question;
