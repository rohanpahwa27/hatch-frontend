import React, { Component } from "react"
import "./ResetPasswordForm.css"
import Button from "@kiwicom/orbit-components/lib/Button";
import InputField from "@kiwicom/orbit-components/lib/InputField";

class ResetPasswordForm extends Component {
    render() {
        return (
            <form onSubmit={(e) => this.props.handleSubmit(e)}>
            <div className="label-input-container">
                <label>Password</label>
                <InputField type="password" placeholder="Create your new password" value={this.props.password} onChange={this.props.handlePasswordChange} />
            </div>
            <div className="label-input-container">
                <label>Confirm password</label>
                <InputField type="password" placeholder="Confirm your new password" value={this.props.confirmPassword} onChange={this.props.handleConfirmPasswordChange} />
            </div>
            {this.props.errors.map(error => (
                    <p className="invalid-credentials" key={error}>{error}</p> 
            ))}
            <Button submit={true} fullWidth={true}>Reset password</Button>
          </form>
        )
    }
}

export default ResetPasswordForm