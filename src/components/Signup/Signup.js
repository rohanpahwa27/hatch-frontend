import React, { Component } from "react";
import "./Signup.css";
import SignupCard from "./SignupCard/SignupCard";

export default class Signup extends Component {
  render() {
    return (
      <div className="justify-content-center">
        <SignupCard />
      </div>
    );
  }
}

