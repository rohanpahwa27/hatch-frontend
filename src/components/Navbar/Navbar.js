import React, { Component } from "react";
import "./Navbar.css";
import hatchLogo from "./Assets/hatch.png";
import { Button, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import Logo from "../Home/Logo/Logo.js";

class Navbar extends Component {
  render() {
    return (
      <div id="navbar-flex-container">
        <div id="navbar-logo-item">
          <img id="navbar-logo" src={hatchLogo} alt="Hatch" />
        </div>
        <div id="navbar-administration-text-item">
          <span id="navbar-administration-text">Administration</span>
        </div>
        <div id="navbar-applicants-link-item">
          <NavLink
            id="navbar-link"
            to="/manage"
          >Applicants</NavLink>
        </div>
        <div id="navbar-members-link-item">
          <NavLink
            id="navbar-link"
            to="/manageMembers"
          >Members</NavLink>
        </div>
      </div>
    )
  }
}

export default Navbar;