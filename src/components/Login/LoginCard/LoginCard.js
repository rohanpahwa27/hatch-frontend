import React, { Component } from "react";
import "./LoginCard.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../../../Api/api.js";

export default class LoginCard extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    const response = await api.loginUser({
      email: email,
      password: password
    });
    console.log(response);
  };

  render() {
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
                  <Form.Group controlId="email">
                    <Form.Control
                      type="email"
                      className="login-input"
                      placeholder="Email Address"
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Control
                      type="password"
                      className="login-input"
                      placeholder="Password"
                    />
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
