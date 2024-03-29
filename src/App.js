import React from "react";
import "./App.css";
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PublicRoute from "./components/Routes/PublicRoute"
import PrivateRoute from "./components/Routes/PrivateRoute"
import AdminRoute from "./components/Routes/AdminRoute"
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home.js";
import Applicant from "./components/Applicant/Applicant"
import ManageApplicants from "./components/Admin/ManageApplicants/ManageApplicants.js";
import ManageMembers from "./components/Admin/ManageMembers/ManageMembers"
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.js"
import ResetPassword from "./components/ResetPassword/ResetPassword.js"
import Page from "./components/Page/Page.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>
        <PublicRoute restricted={true} component={<Signup />} path="/signup" exact />
        <PrivateRoute component={<Home/>} loadingScreen={true} path="/home" exact />
        <PublicRoute restricted={true} component={<Login />} path="/login" exact />
        <PrivateRoute component={<Applicant />} path="/applicant" exact />
        <AdminRoute component={<ManageApplicants />} path="/admin/applicants" exact />
        <AdminRoute component={<ManageMembers />} path="/admin/members" exact />
        <Route path="/page" component={Page} />
        <PublicRoute restricted={true} component={<ForgotPassword />} path="/forgot-password" exact />
        <PublicRoute restricted={true} component={<ResetPassword />} path="/reset-password/:token" exact />
      </Switch>
    </Router>
  );
}

export default App;