import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Datatable from "./components/Datatable/Datatable";
import Home from "./components/Home/Home";
import importApplicants from "./components/Admin/importApplicants/importApplicants"

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}  />
      <Route path="/Signup" component={Signup} />
      <Route path="/Login" component={Login} />
      <Route path="/Overview" component={Datatable} />
      <Route path="/importApplicants" component={importApplicants} />
    </Router>
  );
}

export default App;