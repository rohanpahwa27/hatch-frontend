import React, { Component } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div id="navbar-flex-container">
        <div id="navbar-applicants-link-item">
          <NavLink
            id={window.location.pathname.toLowerCase() === "/Admin/Applicants".toLowerCase() ?
              "navbar-link-green" : "navbar-link-grey"}
            to="/Admin/Applicants"
          >
            <span id="top-navbar-text">Applicants</span>
          </NavLink>
        </div>
        <div id="navbar-members-link-item">
          <NavLink
            id={window.location.pathname.toLowerCase() === "/Admin/Members".toLowerCase() ?
              "navbar-link-green" : "navbar-link-grey"}
            to="/Admin/Members"
          >
            <span id="top-navbar-text">Members</span>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Navbar;