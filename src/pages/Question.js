import React, { useState, useEffect } from "react";
import { createQuestion } from "../helpers/common/forum_api_calls";
import { getAllCategories } from "../helpers/admin/admin_api_calls";

const Question = ({ history }) => {
	const [categories, setCategories] = useState([]);
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [msg, setMsg] = useState("");

	useEffect(() => {
		getAllCategories()
			.then((r) => r.json())
			.then((d) => setCategories(d))
			.catch((err) => setMsg(err));
	}, []);

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
	};

	const handleQuestionChange = (e) => {
		setContent(e.target.value);
	};

	const handleSubmit = () => {
		createQuestion(content, category)
			.then((r) => r.json())
			.then((d) => {
				if (d.error) {
					setMsg(d.error);
				} else setMsg(d.message);
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
					<div>{msg}</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default Question;
