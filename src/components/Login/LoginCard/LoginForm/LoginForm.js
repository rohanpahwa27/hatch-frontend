import React, { Component } from "react"
import "./LoginForm.css"
import Button from "@kiwicom/orbit-components/lib/Button";

import email from "./Icons/email.png"
import password from "./Icons/password.png"

class LoginForm extends Component {
    render() {
        return (
            <form onSubmit={(e) => this.props.handleSubmit(e)}>
            <div className="label-input-container">
                <span>Email</span>
                <div className="img-input-container">
                    <img src={email} alt="email icon" />
                    <input type="text" placeholder="type your email" value={this.props.email} onChange={this.props.handleEmailChange} />
                </div>
            </div>
            <div className="label-input-container">
                <span>Password</span>
                <div className="img-input-container">
                    <img src={password} alt="password icon" />
                    <input type="password" placeholder="type your password" value={this.props.password} onChange={this.props.handlePasswordChange} /> 
                </div>
            </div>
            <div id="forgot-password-container">
                <a href="">Forgot your password?</a>
            </div>
            {this.props.errors.map(error => (
                    <p className="invalid-credentials" key={error}>{error}</p> 
            ))}
            <Button submit={true} fullWidth={true}>Login</Button>
          </form>
        )
    }
}

export default LoginForm