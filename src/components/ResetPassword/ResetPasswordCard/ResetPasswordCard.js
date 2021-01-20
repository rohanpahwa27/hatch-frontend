import React, { Component } from "react";
import "./ResetPasswordCard.css";
import api from "../../../Api/api.js";
import ResetPasswordForm from "./ResetPasswordForm/ResetPasswordForm.js"
import { withRouter, useParams } from "react-router-dom";

const initialState = {
  password: "",
  confirmPassword: "",
  errors: []
};

// checks if password and confirm password are empty
function validate(password, confirmPassword) {
  const errors = [];
  if (password.length === 0) {
    errors.push("First password field can't be empty");
    return errors;
  }

  if (confirmPassword.length === 0) {
    errors.push("Second password field can't be empty");
    return errors;
  }

  return [];
}

class ResetPasswordCard extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate(this.state.password, this.state.confirmPassword);
    if (errors.length > 0) {
      this.setState({ errors: errors });
      return;
    }

    const token = this.props.match.params.token
    
    const response = await api.resetPassword(token, {
      password: this.state.password
    });
    console.log(response);

    if (response.data.status === "error"){
      errors.push(response.data.message)
      this.setState({ errors: errors });
      return;
    }
  };

  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };

  handleConfirmPasswordChange = evt => {
    this.setState({ confirmPassword: evt.target.value });
  };

  render() {
    const resetPasswordText = (
        <div>
            <h5> Reset password </h5>
            <p> We've sent instructions to your email to reset your password. </p>
        </div>
    )

    const { errors } = this.state;
    return (
      <div id="reset-password-card-container"> 
        <div id="reset-password-card-content">
          {resetPasswordText}
          <ResetPasswordForm password={this.state.password} confirmPassword={this.state.confirmPassword} handleSubmit={this.handleSubmit} handlePasswordChange={this.handlePasswordChange} handleConfirmPasswordChange={this.handleConfirmPasswordChange} errors={errors} />
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

export default withRouter(ResetPasswordCard);
