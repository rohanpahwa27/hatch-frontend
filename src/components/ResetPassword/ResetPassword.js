import React, { Component } from "react";
import "./ResetPassword.css";
import ResetPasswordCard from "./ResetPasswordCard/ResetPasswordCard";
import LogoSlogan from "../LogoSlogan/LogoSlogan.js"

class ResetPassword extends Component {
  render() {
    return (
      <div id="reset-password-grid-container">
        <div id="reset-password-grid-item">
            <LogoSlogan />
            <ResetPasswordCard />
        </div>
      </div>
    );
  }
}

export default ResetPassword