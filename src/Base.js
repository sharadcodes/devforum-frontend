import React from "react";
import Nav from "./Nav";
import { isAuthenticated } from "./helpers/auth/auth_api_calls";

const Base = ({ children }) => {
	const { user } = isAuthenticated();
	return (
		<React.Fragment>
			<Nav />
			<main>
				{isAuthenticated() && (
					<div className="userinfo">
						<h5>
							Hi! {user.name} ({user.email}) {user.role === 0 ? "" : "ADMIN"}
						</h5>
					</div>
				)}
				{children}
			</main>
		</React.Fragment>
	);
};

export default Base;
