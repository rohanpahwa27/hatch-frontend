import React, { Component } from "react";
import "./SignupCard.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../../../Api/api.js";


const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  errors: []
};

function validate(email, password, firstName, lastName) {
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

  return errors;
}
export default class SignupCard extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  
  handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate(this.state.email, this.state.password, this.state.firstName, this.state.lastName);
    console.log(errors);
    if (errors.length > 0) {
      this.setState({ errors: errors });
      return;
    }
    this.setState(initialState);
    const response = await api.insertUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    });
    console.log(response);

    if (response.status === "error"){
      alert("Error: " + response.message);
    }
    else {
      alert("Account was created successfully!");
    }
  };

  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  };

  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };

  handleFirstNameChange = evt => {
    this.setState({ firstName: evt.target.value });
  };

  handleLastNameChange = evt => {
    this.setState({ lastName: evt.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <Container className="signup-container">
        <Row>
          <Col
            sm={{ span: 12 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 6, offset: 3 }}
          >
            <div>
              <p className="welcome-text">Welcome!</p>
            </div>
            <div className="d-flex flex-column signup-card p-3 p-lg-5">
              <div>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                  <Form.Group controlId="firstName">
                    <Form.Control
                      id="firstNameInput"
                      type="text"
                      className="signup-input"
                      value={this.state.firstName}
                      placeholder="First Name"
                      onChange={this.handleFirstNameChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="lastName">
                    <Form.Control
                      id="firstNameInput"
                      type="text"
                      className="signup-input"
                      placeholder="Last Name"
                      value={this.state.lastName}
                      onChange={this.handleLastNameChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Control
                      type="email"
                      className="signup-input"
                      placeholder="Email Address"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Control
                      type="password"
                      className="signup-input"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                  </Form.Group>
                  <fieldset>
                  <Form.Group>
                  {errors.map(error => (
                  <p className= "invalid-credentials-container" key={error}>{error}</p>
                ))}
              </Form.Group>
              </fieldset>
             
                  <Button block size="lg" type="submit" className="signup-btn">
                    <span>Sign Up</span>
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
