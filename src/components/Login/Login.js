import React, { Component } from "react";
import "./Login.css";
import Header from "../Header/Header";
import LoginCard from "./LoginCard/LoginCard";

export default class Login extends Component {
  render() {
    return (
      <div className="justify-content-center">
        <Header />
        <LoginCard />
      </div>
    );
  }
}

