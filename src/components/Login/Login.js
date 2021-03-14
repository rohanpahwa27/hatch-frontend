import React, { Component } from "react";
import "./Login.css";
import LoginCard from "./LoginCard/LoginCard";
import LogoSlogan from "../LogoSlogan/LogoSlogan.js"

export default class Login extends Component {
  render() {
    return (
      <div id="login-grid-container">
        <div id="login-grid-item">
          <LogoSlogan />
          <LoginCard />
        </div>
      </div>
    );
  }
}

