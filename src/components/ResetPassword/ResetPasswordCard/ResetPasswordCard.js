import React, { Component } from "react";
import "./ResetPasswordCard.css";
import api from "../../../Api/api.js";
import ResetPasswordForm from "./ResetPasswordForm/ResetPasswordForm.js"
import { withRouter, useParams } from "react-router-dom";

const initialState = {
  password: "",
  confirmPassword: "",
  submitted: false,
  validToken: false,
  errors: []
};

// checks if password and confirm password are empty
function validate(password, confirmPassword) {
  const errors = [];
  if (password.length === 0) {
    errors.push("First password field can't be empty.");
  }

  if (confirmPassword.length === 0) {
    errors.push("Second password field can't be empty.");
  }

  if (password !== confirmPassword) {
    errors.push("Passwords don't match.")
  }

  return errors;
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
    
    await api.resetPassword(token, {
      password: this.state.password
    }).then(res => {
      console.log(res)
      this.setState({
        submitted: true,
        validToken: true
      })
    }).catch(err => {
      console.log(err)
      errors.push(err)
      this.setState({ submitted: true, validToken: false, errors: errors });
    })
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

    const confirmationText = (
      <div>
          <h5> Your password has been reset </h5>
          <p> Use your new password to <a href="http://localhost:8080/login"> login.</a> </p>
      </div>
    )

    const invalidTokenText = (
      <div>
          <h5> Invalid token </h5>
          <p> The token is either invalid or has expired. Please <a href="http://localhost:8080/forgot-password">try again.</a></p>
      </div>
    )

    let text

    if (this.state.submitted) {
      if (this.state.validToken) {
        text = confirmationText
      }
      else {
        text = invalidTokenText
      }
    }
    else {
      text = resetPasswordText
    }

    const { errors } = this.state;
    return (
      <div id="reset-password-card-container"> 
        <div id="reset-password-card-content">
          {text}
          {this.state.submitted ? <div> </div> : <ResetPasswordForm password={this.state.password} confirmPassword={this.state.confirmPassword} handleSubmit={this.handleSubmit} handlePasswordChange={this.handlePasswordChange} handleConfirmPasswordChange={this.handleConfirmPasswordChange} errors={errors} /> }
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
