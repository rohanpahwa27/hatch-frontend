import React, { Component } from "react";
import "./SignupCard.css";
import queryString from 'query-string';
import api from "../../../Api/api.js";
import { Link } from "react-router-dom";


const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  orgCode: "",
  errors: []
};

function validate(email, password, confirmPassword, firstName, lastName) {
  const errors = [];
  if (firstName.length === 0) {
    errors.push("First Name can't be empty");
    return errors;
  }
  if (lastName.length === 0) {
    errors.push("Last Name can't be empty");
    return errors;
  }

  if (email.length === 0) {
    errors.push("Email can't be empty");
    return errors;
  }

  if (!email.includes('@')){
    errors.push("Email must include \'@\' symbol")
    return errors;
  }

  if (password.length < 6) {
    errors.push("Password should be at least 6 characters long");
    return errors;
  }

  if (password != confirmPassword) {
    errors.push("Passwords don't match.");
    return errors;
  }

  return [];
}
export default class SignupCard extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  
  handleSubmit = async (event, admin) => {
    event.preventDefault();
    console.log('ADMIN HERE:', admin)
    const errors = validate(this.state.email, this.state.password, this.state.confirmPassword, this.state.firstName, this.state.lastName);
    console.log(errors);
    if (errors.length > 0) {
      this.setState({ errors: errors });
      return;
    }
    let user = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }
    if (admin) {
      user.organizationName = this.state.orgCode;
    } else {
      user.organizationCode = this.state.orgCode;
    }
    const response = await api.insertUser(user);

    if (response.data.status === "error"){
      errors.push(response.data.message)
      this.setState({ errors: errors });
      return;
    }
    this.setState(initialState);
  };

  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  };

  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };

  handleConfirmPasswordChange = evt => {
    this.setState({ confirmPassword: evt.target.value });
  };

  handleFirstNameChange = evt => {
    this.setState({ firstName: evt.target.value });
  };

  handleLastNameChange = evt => {
    this.setState({ lastName: evt.target.value });
  };

  handleOrgCode = evt => {
    this.setState({ orgCode: evt.target.value });
  };

  render() {
    const { errors } = this.state;
    const memberIsAdmin = queryString.parse(window.location.search).query == 'admin' ? "type your organization's name" : "type your group's add code";
    const admin = queryString.parse(window.location.search).query == 'admin'
    let submit;
    let signup;
    if (!admin) {
      submit = <input type="submit" value="Done" admin={false} onClick={(e) => this.handleSubmit(e, admin)}></input>
      signup = <p className="adminSignUp">if your group doesn’t have an add code or any accounts with us yet, 
      <Link className='signupLink' to="/signup?query=admin"> sign up as a administrator </Link></p>
    }
    return (
      <div className="signup-container">
        <div className = "col1">
        <div class="row">
          <div class="column">
            <p className="name">Hatch</p>
          </div>
        </div>
          <div class="row">
            <div class="column">
              <p className="helper">First Name</p>
              <input
                id="firstNameInput"
                type="text"
                className="signup-input"
                value={this.state.firstName}
                placeholder="type your first name"
                onChange={this.handleFirstNameChange}
              />
            </div>
            <div class="column">
              <p className="helper">Last Name</p>
              <input
                id="lastNameInput"
                type="text"
                className="signup-input"
                placeholder="type your last name"
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
              />
            </div>
          </div>
          <div class="row">
            <div class="column">
              <p className="helper">Email</p>
              <input
                type="email"
                type="text"
                className="signup-input"
                placeholder="type your email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </div>
            <div class="column"></div>
          </div>
          <div class="row">
            <div class="column">
              <p className="helper">Password (6+ characters required)</p>
              <input
                type="password"
                className="signup-input"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <div class="column">
              <p className="helper">Confirm</p>
              <input
                type="password"
                className="signup-input"
                placeholder="retype password"
                value={this.state.confirmPassword}
                onChange={this.handleConfirmPasswordChange}
              />
            </div>
          </div>
          <div class="row">
            <div class="column">
              <p className="helper">Organization's add code</p>
              <input
                type="text"
                className="signup-input"
                placeholder= {memberIsAdmin}
                value={this.state.orgCode}
                onChange={this.handleOrgCode}
              />
            </div>
            <div class="column">
              {signup}
            </div>
          </div>
          <div className="row">
            <div class="column"></div>
            <div class="column">
              {errors.map(error => (
                    <p className= "invalid-credentials-container" key={error}>{error}</p>
                    ))}
              {submit}
            </div>
          </div>
        </div>
        <div className = "col2 column">
        </div>
        <div className = "col3 instructionsColumn">
          <div className = "col">
            <p className="set-up-account">Set up your account</p> 
              <p className="instructions">We’re so excited to have you here with us!<br></br>Follow these steps to sign up as a member of your organization.</p>
          </div>
        </div>
      </div>
          
        
    );
  }
}