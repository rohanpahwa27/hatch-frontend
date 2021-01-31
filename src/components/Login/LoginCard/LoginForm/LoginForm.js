import React, { Component } from "react"
import "./LoginForm.css"
import Button from "@kiwicom/orbit-components/lib/Button";
import InputField from "@kiwicom/orbit-components/lib/InputField";

class LoginForm extends Component {
    render() {
        return (
            <form onSubmit={(e) => this.props.handleSubmit(e)}>
            <div className="label-input-container">
                <label>Email</label>
                <InputField type="text" placeholder="type your email" value={this.props.email} onChange={this.props.handleEmailChange} />
            </div>
            <div className="label-input-container">
                <label>Password</label>
                <InputField type="password" placeholder="type your password" value={this.props.password} onChange={this.props.handlePasswordChange} />
            </div>
            <div id="forgot-password-container">
                <a href="/forgot-password">Forgot your password?</a>
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