import React, { useState } from "react";
import Base from "../Base";
import { createCategory } from "../helpers/admin/admin_api_calls";

import Loader from "react-loader-spinner";

const AdminDash = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		setError("");
		setName(event.target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setError("");
		setSuccess(false);
		setLoading(true);

		//backend request fired
		createCategory(name)
			.then((data) => {
				if (data.error) {
					setError(data);
					setLoading(false);
				} else {
					setError("");
					setName("");
					setSuccess(true);
					setLoading(false);
				}
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	};

	const loader = () => {
		return (
			loading && (
				<div style={{ textAlign: "center" }}>
					<Loader
						type="Bars"
						color="#001133"
						height={50}
						width={50}
						timeout={3000} //3 secs
					/>
				</div>
			)
		);
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
			{loader()}
			{successMessage()}
			{warningMessage()}
		</Base>
	);
};

export default AdminDash;
