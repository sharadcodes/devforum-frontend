import React from "react";
import { withRouter, Link } from "react-router-dom";
import { isAuthenticated, signout } from "./helpers/auth/auth_api_calls";

const Nav = ({history}) => {
	return (
		<nav>
			<Link to="/">HOME</Link>
			<div>
				{!isAuthenticated() && <Link to="/signin">SIGN IN</Link>}
				{!isAuthenticated() && <Link to="/signup">SIGN UP</Link>}
				{isAuthenticated() && isAuthenticated().user.role === 1 && (
					<Link to="/admindashboard">ADMIN DASH</Link>
				)}
				{isAuthenticated() && (
					<span
						id="hv"
						onClick={() => {
							signout().then(() => {
								history.push("")
							});
						}}
					>
						LOGOUT
					</span>
				)}
			</div>
		</nav>
	);
};

export default withRouter(Nav);
