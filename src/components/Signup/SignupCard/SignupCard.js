import React, { Component } from "react";
import "./SignupCard.css";
import queryString from 'query-string';
import api from "../../../Api/api.js";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  org: "",
  errors: {}
};

function validate(email, password, confirmPassword, firstName, lastName, org) {
  const errors = {};
  if (firstName.length === 0) {
    errors.firstName = "Required Field"
  }
  if (lastName.length === 0) {
    errors.lastName = "Required Field"
  }

  if (email.length === 0) {
    errors.email = "Required Field"
  } else if (!email.includes('@')){
    errors.email = "Email must include \'@\' symbol"
  }

  if (password.length < 6) {
    errors.password = "Must be 6+ characters"
  }

  if (confirmPassword.length == 0) {
    errors.confirmPassword = "Required Field"
  }

  if (org.length === 0) {
    errors.org = "Required Field"
  }

  if (password != confirmPassword) {
    errors.password = "Passwords don't match."
    errors.confirmPassword = " "
  }
  return errors;
}
class SignupCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  
  handleSubmit = async (event, admin) => {
    event.preventDefault();
    console.log('ADMIN HERE:', admin)
    const errors = validate(this.state.email, this.state.password, this.state.confirmPassword, this.state.firstName, this.state.lastName, this.state.org);
    console.log(errors);
    if (errors) {
      this.setState({ errors: errors });
      return;
    }
    let user = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      admin: admin
    }

    if (admin) {
      user.organizationName = this.state.org;
    } else {
      user.organizationCode = this.state.org;
    }
    const response = await api.insertUser(user);

    if (response.data.status === "error"){
      errors.push(response.data.message)
      this.setState({ errors: errors });
      return;
    }

    localStorage.setItem("userID", response.data.user._id);
    localStorage.setItem("orgID", response.data.user.organizations[0]);
    this.props.history.push("/Login");
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

  handleOrg = evt => {
    this.setState({ org: evt.target.value });
  };

  render() {
    const { errors } = this.state;
    const memberIsAdmin = queryString.parse(window.location.search).query == 'admin' ? "type your organization's name" : "type your group's add code";
    const admin = queryString.parse(window.location.search).query == 'admin'
    let submit;
    let signup;
    if (!admin) {
      // submit = <input type="submit" value="Done" admin={false} onClick={(e) => this.handleSubmit(e, admin)}></input>
      submit = <Button className= "submit" type="primary" admin={false} onClick={(e) => this.handleSubmit(e, admin)}>Done</Button>
      signup = <p className="adminSignUp">if your group doesn’t have an add code or any accounts with us yet, <Link className='signupLink' to="/signup?query=admin">sign up as a administrator </Link></p>
    }
    return (
      <div className="signup-container">
        <div className="signup-card">
          <div className="row">
            <div class="column"> <p>Create your Hatch account</p></div>
            <div class="column">
            </div>
          </div>
          <div class="row">
            <div class="column">
              <InputField
                label="First Name"
                placeholder="type your first name"
                error = {errors.firstName}
                value={this.state.firstName}
                onChange={this.handleFirstNameChange}
              /> 
            </div>
            <div class="column">
              <InputField
                label="Last Name"
                placeholder="type your last name"
                error = {this.state.errors.lastName}
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
              />
            </div>
          </div>
          <div class="row">
            <div class="column">
              <InputField
                label="Email"
                error = {this.state.errors.email}
                placeholder="type your email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </div>
            <div class="column"></div>
          </div>
          <div class="row">
            <div class="column">
              <InputField
                label="Password"
                placeholder="create a password"
                type="password"
                help="6+ characters"
                error={this.state.errors.password}
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <div class="column">
              <InputField
                label="Confirm Password"
                placeholder="retype password"
                type="password"
                error={this.state.errors.confirmPassword}
                value={this.state.confirmPassword}
                onChange={this.handleConfirmPasswordChange}
              />
            </div>
          </div>
          <div class="row">
            <div class="column">
              <InputField
                label="Add Code"
                placeholder= {memberIsAdmin}
                error={this.state.errors.org}
                value={this.state.org}
                onChange={this.handleOrg}
              />
            </div>
            <div class="column">
              {signup}
            </div>
          </div>
          <div className="row">
            <div class="column"></div>
            <div class="column">
              {submit}
            </div>
          </div>
        </div>
      </div>
          
        
    );
  }
}

export default withRouter(SignupCard);


{/* <div className = "col1">
        <div class="row">
          <div class="column">
            <p className="name">Hatch</p>
          </div>
        </div>
          <div class="row">
            <div class="column">
              <InputField
                id="firstNameInput"
                type="text"
                label= "First Name"
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
                value={this.state.org}
                onChange={this.handleOrg}
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
        </div> */}