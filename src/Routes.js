import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./helpers/routes/PrivateRoute";
import AdminRoute from "./helpers/routes/AdminRoute";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Forum from "./pages/Forum";
import AdminDash from "./pages/AdminDash";
import UserDash from './pages/UserDash';
import FullQuestion from './pages/FullQuestion';

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Forum} />
				<Route path="/signin" exact component={SignIn} />
				<Route path="/signup" exact component={SignUp} />
				<Route path="/question/:qid" exact component={FullQuestion} />
				<PrivateRoute path="/userdashboard" exact component={UserDash} />
				<AdminRoute path="/admindashboard" exact component={AdminDash} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
