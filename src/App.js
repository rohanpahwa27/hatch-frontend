import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PublicRoute from "./components/Routes/PublicRoute"
import PrivateRoute from "./components/Routes/PrivateRoute"
import AdminRoute from "./components/Routes/AdminRoute"
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Start from "./components/Start/Start.js";
import Home from "./components/Home/Home.js";

// import ImportApplicants from "./components/Admin/ImportApplicants/ImportApplicants.js";
// import Import from "./components/Admin/importApplicants/Import/Import.js";
import Applicant from "./components/Applicant/Applicant"
import ManageApplicants from "./components/Admin/manageApplicants/ManageApplicants.js";
import ManageMembers from "./components/Admin/ManageMembers/ManageMembers"
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.js"
import ResetPassword from "./components/ResetPassword/ResetPassword.js"
import Page from "./components/Page/Page.js";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={false} component={<Start />} path="/" exact />
        <PublicRoute restricted={true} component={<Signup />} path="/Signup" exact />
        <PrivateRoute component={<Home/>} loadingScreen={true} path="/Home" exact />
        <PublicRoute restricted={true} component={<Login />} path="/Login" exact />
        {/* <Route path="/import1" component={ImportApplicants} /> */}
        {/* <Route path="/import2" component={Import} /> */}
        <PrivateRoute component={<Applicant />} path="/Applicant" exact />
        <AdminRoute component={<ManageApplicants />} path="/Admin/Applicants" exact />
        <AdminRoute component={<ManageMembers />} path="/Admin/Members" exact />
        <Route path="/page" component={Page} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password/:token" component={ResetPassword} />
      </Switch>
    </Router>
  );
}

export default App;