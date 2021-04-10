import React from "react";
import "./SignupCard.css";
import queryString from 'query-string';
import api from "../../../Api/api.js";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import {trackEvent} from "../../../tracking/utils"

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
  } else if (!email.includes('@')) {
    errors.email = "Email must include '@' symbol"
  }

  if (password.length === 0) {
    errors.password = "Required Field"
  } else if (password.length < 6) {
    errors.password = "Must be 6+ characters"
  }

  if (confirmPassword.length === 0) {
    errors.confirmPassword = "Required Field"
  }

  if (org.length === 0) {
    errors.org = "Required Field"
  }

  if (password !== confirmPassword) {
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
    const errors = validate(this.state.email, this.state.password, this.state.confirmPassword, this.state.firstName, this.state.lastName, this.state.org);
    console.log(errors);
    if (Object.keys(errors).length) {
      this.setState({ errors: errors });
      return;
    }
    let user = {
      email: this.state.email.trim(),
      password: this.state.password,
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      isAdmin: admin
    }
    if (admin) {
      user.organizationName = this.state.org.trim();
    } else {
      user.organizationCode = this.state.org.trim();
    }
    const response = await api.insertUser(user);
    if (response.data.status === "error") {
      if (response.data.message === 'Organization Name taken.') {
        errors.org = response.data.message
      } else if (response.data.message === 'Add code doesn\'t exist.') {
        errors.org = response.data.message
      } else {
        errors.email = response.data.message;
      }
      this.setState({ errors: errors });
      return;
    }
    trackEvent('New User', {accountType: (admin) ? 'Administrator' : 'General Member'})
    this.props.history.push("/login");
  };

  handleEmailChange = evt => {
    this.setState({ errors: {} });
    this.setState({ email: evt.target.value });
  };

  handlePasswordChange = evt => {
    this.setState({ errors: {} });
    this.setState({ password: evt.target.value });
  };

  handleConfirmPasswordChange = evt => {
    this.setState({ errors: {} });
    this.setState({ confirmPassword: evt.target.value });
  };

  handleFirstNameChange = evt => {
    this.setState({ errors: {} });
    this.setState({ firstName: evt.target.value });
  };

  handleLastNameChange = evt => {
    this.setState({ errors: {} });
    this.setState({ lastName: evt.target.value });
  };

  handleOrg = evt => {
    this.setState({ errors: {} });
    this.setState({ org: evt.target.value });
  };

  render() {
    const { errors } = this.state;
    const memberIsAdmin = queryString.parse(window.location.search).query === 'admin' ? "type your organization's name" : "type your group's add code";
    const admin = queryString.parse(window.location.search).query === 'admin'
    // let submit;
    let signup;
    let organizationNameorCode;
    if (!admin) {
      // submit = <div className= "submit"><Button type="primary" admin={false} onClick={(e) => this.handleSubmit(e, admin)}>Done</Button></div>
      organizationNameorCode = <InputField
        label="Add Code"
        placeholder={memberIsAdmin}
        error={this.state.errors.org}
        value={this.state.org}
        onChange={this.handleOrg}
        maxLength="4"
      />
      // signup = <p className="adminSignUp">if your group doesn’t have an add code or a Hatch account, <Link className='signupLink' to="/signup?query=admin">sign up as a administrator </Link></p>
    } else {
      organizationNameorCode = <InputField
        label="Organization Name"
        placeholder={memberIsAdmin}
        error={this.state.errors.org}
        value={this.state.org}
        onChange={this.handleOrg}
      />
      signup = <p className="adminSignUp">If someone in your organization is asking you to join them on Hatch, <Link className='signupLink' to="/signup?query=member">sign up as a member </Link></p>
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
                error={errors.firstName}
                value={this.state.firstName}
                onChange={this.handleFirstNameChange}
                maxLength="20"
              />
            </div>
            <div class="column">
              <InputField
                label="Last Name"
                placeholder="type your last name"
                error={this.state.errors.lastName}
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
                maxLength="20"
              />
            </div>
          </div>

          <div class="row">
            <div class="column">
              <InputField
                label="Email"
                error={this.state.errors.email}
                placeholder="type your email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                maxLength="30"
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
                error={this.state.errors.password}
                value={this.state.password}
                onChange={this.handlePasswordChange}
                maxLength="30"
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
                maxLength="30"
              />
            </div>
          </div>

          <div class="row">
            <div class="column">
              {organizationNameorCode}
            </div>
          </div>

          <div class="row">
            <div class="column">
              {signup}
            </div>
          </div>

          <div className="row">
            <div class="column"></div>
            <div class="column">
              <div className="submit">
                <Button type="primary" admin={false} onClick={(e) => this.handleSubmit(e, admin)}>Done</Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default withRouter(SignupCard);