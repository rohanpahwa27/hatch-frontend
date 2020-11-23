import React, { Component } from "react";
import "./Home.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <Container className="home-container">
        <Row>
          <Col
            sm={{ span: 12 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 6, offset: 3 }}
          >
            <div>
              <p className="welcome-text">Welcome to our company!</p>
            </div>
            <div>
              <p className="get-started-text">Empowering people in groups
              <br />Finding members to work together and make their voices count</p>
            </div>
            <div className="d-flex flex-column home-card p-3 p-lg-5">
              <div>
                <Link to="/login">
                  <Button block size="lg" className="login-btn">
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button block size="lg" className="home-btn">
                    <span>Sign Up</span>
                  </Button>
                </Link>
                <br/>
                <Link to="/overview">
                <Button block size="lg" className="home-btn">
                    <span>Overview</span>
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
