import React, { Component } from "react";
import "./Signup.css";
import "../Login/Login.css"
import SignupCard from "./SignupCard/SignupCard";
import SignupLogo from "./SignupLogo/SignupLogo"

export default class Signup extends Component {
  render() {
    return (
      <div id="signup-grid-container">
        <div id="signup-grid-item">
          <SignupLogo />
          <SignupCard />
        </div>
      </div>
    );
  }
}

