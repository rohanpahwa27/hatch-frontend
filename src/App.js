import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Route exact path="/" component={Start}  />
      <Route path="/Signup" component={Signup} />
      <Route path="/Login" component={Login} />
      <Route path="/Home" component={Home} />
      {/* <Route path="/import1" component={ImportApplicants} /> */}
      {/* <Route path="/import2" component={Import} /> */}
      <Route path="/Applicant" component={Applicant} />
      <Route path="/manageApplicants" component={ManageApplicants} />
      <Route path="/manageMembers" component={ManageMembers} />
      <Route path="/forgot-password" component={ForgotPassword} />
    </Router>
  );
}

export default App;