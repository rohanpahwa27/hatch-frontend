import React, { Component } from "react";
import "./ForgotPasswordCard.css";
import api from "../../../Api/api.js";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm.js"
import { withRouter } from "react-router-dom";

const initialState = {
  email: "",
  errors: []
};

// checks if email and password are empty
function validate(email) {
  const errors = [];
  if (email.length === 0) {
    errors.push("Email can't be empty");
    return errors;
  }

  return [];
}

class ForgotPasswordCard extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate(this.state.email);
    if (errors.length > 0) {
      this.setState({ errors: errors });
      return;
    }
    
    console.log("sup")
    const response = await api.forgotPassword({
      email: this.state.email
    });
    console.log(response);

    if (response.data.status === "error"){
      errors.push(response.data.message)
      this.setState({ errors: errors });
      return;
    }
  };

  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div id="forgot-password-card-container"> 
        <div id="forgot-password-card-content">
          <h5> Reset password </h5>
          <p> Enter the email associated with your account and we'll send you an email with instructions to reset your password </p>
          <ForgotPasswordForm email={this.state.email} handleSubmit={this.handleSubmit} handleEmailChange={this.handleEmailChange} errors={errors} />
          <p id="create-account-label">Or, create an account to get started</p>
          <div id="sign-up-links">
            <a href="signup?query=member">Sign up as a member</a>
            <a href="signup?query=admin">Sign up as an administrator</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ForgotPasswordCard);
