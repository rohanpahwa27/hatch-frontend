import React, { Component } from "react"
import "./Page.css"

import Navbar from "../Navbar/Navbar.js";
import Logo from "./Logo/Logo.js";
import SideNavBar from "../SideNavBar/SideNavBar.js";

class Page extends Component {
  render() {
    return (
      <div id="page-grid-container">
        <Logo />
        <SideNavBar />
        <div id="navbar-content-grid-container">
          <Navbar />
          <div id="">
            {/* Your Component goes here */}
          </div>
        </div>
      </div>
    )
  }
}

export default Page;