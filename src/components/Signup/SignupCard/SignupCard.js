import React, { Component } from "react";
import "./SignupCard.css";
import queryString from 'query-string';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../../../Api/api.js";


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
  
  handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate(this.state.email, this.state.password, this.state.confirmPassword, this.state.firstName, this.state.lastName);
    console.log(errors);
    if (errors.length > 0) {
      this.setState({ errors: errors });
      return;
    }
    const response = await api.insertUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    });

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
    console.log(queryString.parse(window.location.search).query == 'admin');
    const memberIsAdmin = queryString.parse(window.location.search).query == 'admin' ? "type your organization's name" : "type your group's organization code";
    return (
      <Container className="signup-container">
        <Row>
          <Col
            sm={{ span: 12 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 6, offset: 3 }}
          >
            
            <div className="signup-card">
              <Form onSubmit={(e) => this.handleSubmit(e)}>
              <div className="row padding">
                <div className = "col">
                  <p className="helper">First Name</p>
                  <Form.Group>
                    <Form.Control
                      id="firstNameInput"
                      type="text"
                      className="signup-input"
                      value={this.state.firstName}
                      placeholder="First Name"
                      onChange={this.handleFirstNameChange}
                      />
                  </Form.Group>
                </div>
                <div className = "col">
                  <p className="helper">Last Name</p>
                  <Form.Group>
                    <Form.Control
                      id="lastNameInput"
                      type="text"
                      className="signup-input"
                      placeholder="Last Name"
                      value={this.state.lastName}
                      onChange={this.handleLastNameChange}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row padding">
                <div className = "col">
                  <p className="helper">Email</p>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      className="signup-input"
                      placeholder="Email Address"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                  </Form.Group>
                </div>
                <div className = "col">
                </div>
              </div>
              <div className="row padding">
                <div className = "col">
                  <p className="helper">Password (6+ characters required)</p>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      className="signup-input"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                    </Form.Group>
                </div>
                <div className = "col">
                  <p className="helper">Confirm</p>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      className="signup-input"
                      placeholder="Confirm Password"
                      value={this.state.confirmPassword}
                      onChange={this.handleConfirmPasswordChange}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row padding">
                <div className = "col">
                  <p className="helper">Organization's add code</p>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className="signup-input"
                      placeholder= {memberIsAdmin}
                      value={this.state.orgCode}
                      onChange={this.handleOrgCode}
                    />
                  </Form.Group>
                </div>
                <div className = "col">
                  
                </div>
              </div>
              {errors.map(error => (
                  <p className= "invalid-credentials-container" key={error}>{error}</p>
                  ))}
                  <Button block size="lg" type="submit" className="signup-btn">
                    <span>Sign Up</span>
                  </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
          
        
    );
  }
}
