import React, { Component } from "react";
import "./LoginCard.css";
import api from "../../../Api/api.js";
import LoginForm from "./LoginForm/LoginForm.js"
import { withRouter } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  errors: []
};

// checks if email and password are empty
function validate(email, password) {
  const errors = [];
  if (email.length === 0) {
    errors.push("Email can't be empty");
    return errors;
  }

  if (password.length === 0) {
    errors.push("Password cannot be empty");
    return errors;
  }

  return [];
}

class LoginCard extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate(this.state.email, this.state.password);
    if (errors.length > 0) {
      this.setState({ errors: errors });
      return;
    }
    
    const response = await api.loginUser({
      email: this.state.email,
      password: this.state.password
    });
    console.log(response);

    if (response.data.status === "error"){
      errors.push(response.data.message)
      this.setState({ errors: errors });
      return;
    }
    localStorage.setItem("userID", response.data.user._id);
    localStorage.setItem("orgID", response.data.user.organizations[0]);
    localStorage.setItem("isAdmin", response.data.user.admin) //stored as a string not boolean because of localStorage properties
    this.props.history.push("/home");
  };

  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  };

  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div id="login-card-container"> 
        <div id="login-card-content">
          <h6> Welcome back! </h6>
          <LoginForm email={this.state.email} password={this.state.password} handleSubmit={this.handleSubmit} handleEmailChange={this.handleEmailChange} handlePasswordChange={this.handlePasswordChange} errors={errors} />
          <p id="create-account-label">Or, create an account to get started</p>
          <a className="sign-up-link" href="signup?query=member">Sign up as a member</a> or <a className="sign-up-link" href="signup?query=admin">sign up as an admin</a>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginCard);
