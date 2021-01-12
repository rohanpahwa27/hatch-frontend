import React, { Component } from "react"
import "./ChangePassword.css"
import Close from "@kiwicom/orbit-components/lib/icons/Close"
import Button from "@kiwicom/orbit-components/lib/Button";
import Dialog from "@kiwicom/orbit-components/lib/Dialog";
import InputField from "@kiwicom/orbit-components/lib/InputField"
import api from "../../../../../Api/api"


const initialState = {
    currentPassword: "", 
    newPassword: "",
    confirmNewPassword: "",
    errors: {}
};

function validate(currentPassword, newPassword, confirmNewPassword) {
    const errors = {};
    
    if (currentPassword.length === 0){
      errors.currentPassword = "Required Field"
    }
  
    if (newPassword.length == 0) {
      errors.newPassword = "Required Field"
    }
  
    if (confirmNewPassword.length === 0) {
      errors.confirmNewPassword = "Required Field"
    }
  
    if (newPassword != confirmNewPassword) {
      errors.newPassword = "Passwords don't match."
      errors.confirmNewPassword = " "
    }
    return errors;
  }

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
    }

    handleCurrentPasswordChange = evt => {
        this.setState({ errors: {} });
        this.setState({ currentPassword: evt.target.value });
    };

    handleNewPasswordChange = evt => {
        this.setState({ errors: {} });
        this.setState({ newPassword: evt.target.value });
    };

    handleConfirmNewPasswordChange = evt => {
        this.setState({ errors: {} });
        this.setState({ confirmNewPassword: evt.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(this.state.currentPassword, this.state.newPassword, this.state.confirmNewPassword);
        if (Object.keys(errors).length) {
          this.setState({ errors: errors });
          return;
        }
        try {
            const response = await api.loginUser({
                email: this.state.email, //replace with member email
                password: this.state.currentPassword
              });
            console.log(response);
            if (response.data.status === "error"){
            errors.currentPassword = "Current password doesn't match"
            this.setState({ errors: errors });
            return;
            }
        } catch(e){
            errors.currentPassword = 'Service down. Please try again later'
            return;
        }
    };

    render() {
        return (
            <Dialog
                title={
                <div>
                    <div id="change-password-flex-container">
                        <span id="change-password">Change your password</span>
                        <span id="close-button-change-password" onClick={this.props.closeButton}><Close/></span>
                    </div>
                    <div id="change-password-flex-container" className="change-password-padding-top">
                        <div className="change-password-item">
                            <span id="change-password-label">Current password</span>
                            <InputField
                                placeholder="type here"
                                type="password"
                                error={this.state.errors.currentPassword}
                                value={this.state.currentPassword}
                                onChange={this.handleCurrentPasswordChange}
                                maxLength="30"
                            />
                        </div>
                        <div></div>
                    </div>
                    <div id="change-password-flex-container" className="change-password-padding-top-second">
                        <div className="change-password-item">
                            <span id="change-password-label">New password</span>
                            <InputField
                                placeholder="type here"
                                type="password"
                                error={this.state.errors.newPassword}
                                value={this.state.newPassword}
                                onChange={this.handleNewPasswordChange}
                                maxLength="30"
                            />
                        </div>
                        <div className="change-password-item">
                            <span id="change-password-label">Confirm new password</span>
                            <InputField
                                placeholder="type here"
                                type="password"
                                error={this.state.errors.confirmNewPassword}
                                value={this.state.confirmNewPassword}
                                onChange={this.handleConfirmNewPasswordChange}
                                maxLength="30"
                            />
                        </div>
                    </div>
                </div>
                }
                primaryAction={<Button type="primary" onClick={(e) => this.handleSubmit(e)}>Confirm</Button>}
            >
            </Dialog>

        )
    }
}

export default ChangePassword