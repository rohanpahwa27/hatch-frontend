import React, { Component } from "react";
import "./LoginCard.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../../../Api/api.js";

const initialState = {
  email: "",
  password: "",
  errors: []
};

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
export default class LoginCard extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate(this.state.email, this.state.password);
    console.log(errors);
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
    this.setState(initialState);
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
      <Container className="login-container">
        <Row>
          <Col
            sm={{ span: 12 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 6, offset: 3 }}
          >
            <div>
              <p className="welcome-text">Welcome back!</p>
            </div>
            <div className="d-flex flex-column login-card p-3 p-lg-5">
              <div>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      className="signup-input"
                      placeholder="Email Address"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      className="signup-input"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                  </Form.Group>
                  <Form.Group>
                  {errors.map(error => (
                  <p className= "invalid-credentials-container" key={error}>{error}</p>
                  ))}
                  </Form.Group>
                  <fieldset>
                  </fieldset>
                  <Button block size="lg" type="submit" className="login-btn">
                    <span>Login</span>
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
