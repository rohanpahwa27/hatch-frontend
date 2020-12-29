import React, { Component } from "react";
import "./Navbar.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div id="grid-container">
        <div id="grid-item-1">hi</div>
        <div id="grid-item-2">hi</div>
        <div id="grid-item-3">hi</div>
        <div id="grid-item-4">hi</div>
        <div id="grid-item-5">hi</div>
      </div>
    )
  }
}

export default Navbar;