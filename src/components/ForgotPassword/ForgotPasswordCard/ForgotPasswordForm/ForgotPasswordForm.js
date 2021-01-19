import React, { Component } from "react"
import "./ForgotPasswordForm.css"
import Button from "@kiwicom/orbit-components/lib/Button";
import InputField from "@kiwicom/orbit-components/lib/InputField";

class ForgotPasswordForm extends Component {
    render() {
        return (
            <form onSubmit={(e) => this.props.handleSubmit(e)}>
            <div className="label-input-container">
                <label>Email</label>
                <InputField type="text" placeholder="type your email" value={this.props.email} onChange={this.props.handleEmailChange} />
            </div>
            {this.props.errors.map(error => (
                    <p className="invalid-credentials" key={error}>{error}</p> 
            ))}
            <Button submit={true} fullWidth={true}>Send instructions</Button>
          </form>
        )
    }
}

export default ForgotPasswordForm