import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Datatable from "./components/Datatable/Datatable";
import Start from "./components/Start/Start.js";
import Home from "./components/Home/Home.js";
import importApplicants from "./components/Admin/importApplicants/importApplicants"
import ImportHome from "./components/ImportHome/ImportHome.js";
import Import from "./components/Import/Import.js";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Start}  />
      <Route path="/Signup" component={Signup} />
      <Route path="/Login" component={Login} />
      <Route path="/Overview" component={Datatable} />
      <Route path="/Home" component={Home} />
      <Route path="/import1" component={ImportHome} />
      <Route path="/import2" component={Import} />
    </Router>
  );
}

export default App;