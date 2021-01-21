import React, { Component } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div id="navbar-flex-container">
        <div id="navbar-applicants-link-item">
          <NavLink
            id={window.location.pathname.toLowerCase()==="/manageApplicants".toLowerCase() ? 
            "navbar-link-green" : "navbar-link-grey"}
            to="/manageApplicants"
          >Applicants</NavLink>
        </div>
        <div id="navbar-members-link-item">
          <NavLink
            id={window.location.pathname.toLowerCase()==="/manageMembers".toLowerCase() ? 
            "navbar-link-green" : "navbar-link-grey"}
            to="/manageMembers"
          >Members</NavLink>
        </div>
      </div>
    )
  }
}

export default Navbar;