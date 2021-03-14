import React, { Component } from "react";
import "./ForgotPassword.css";
import ForgotPasswordCard from "./ForgotPasswordCard/ForgotPasswordCard";
import LogoSlogan from "../LogoSlogan/LogoSlogan.js"

class ForgotPassword extends Component {
  render() {
    return (
      <div id="forgot-password-grid-container">
        <div id="forgot-password-grid-item">
            <LogoSlogan />
            <ForgotPasswordCard />
        </div>
      </div>
    );
  }
}

export default ForgotPassword