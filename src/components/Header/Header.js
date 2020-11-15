import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Brand className="pl-1 pl-md-4 brand">
          internS Project
        </Navbar.Brand>
      </Navbar>
    );
  }
}
