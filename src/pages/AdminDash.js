import React, { useState } from "react";
import Base from "../Base";
import { createCategory } from "../helpers/admin/admin_api_calls";

const AdminDash = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleChange = (event) => {
		setError("");
		setName(event.target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setError("");
		setSuccess(false);

		//backend request fired
		createCategory(name)
			.then((data) => {
				if (data.error) {
					setError(data);
				} else {
					setError("");
					setSuccess(true);
					setName("");
				}
			})
			.catch((err) => setError(err));
	};

	const successMessage = () => {
		if (success) {
			return <h4>Category created successfully</h4>;
		}
	};

	const warningMessage = () => {
		if (error) {
			return <h4>Failed to create category</h4>;
		}
	};

	const myCategoryForm = () => (
		<form style={{ display: "grid", gridRowGap: "10px" }}>
			<h2>ADMIN DASHBOARD</h2>
			<br />
			<label>CREATE CATEGORY</label>
			<input
				type="text"
				onChange={handleChange}
				value={name}
				autoFocus
				required
				placeholder="Ex. Python"
			/>
			<button onClick={onSubmit}>Create</button>
		</form>
	);

	return (
		<Base>
			{myCategoryForm()}
			{successMessage()}
			{warningMessage()}
		</Base>
	);
};

export default AdminDash;
