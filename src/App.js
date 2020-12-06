import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Datatable from "./components/Datatable/Datatable";
import Start from "./components/Start/Start.js";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Start}  />
      <Route path="/Signup" component={Signup} />
      <Route path="/Login" component={Login} />
      <Route path="/Overview" component={Datatable} />
    </Router>
  );
}

export default App;