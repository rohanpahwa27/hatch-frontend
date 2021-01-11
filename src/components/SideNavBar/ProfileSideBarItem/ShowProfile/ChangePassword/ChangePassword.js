import React, { Component } from "react"
import "./ChangePassword.css"
import Close from "@kiwicom/orbit-components/lib/icons/Close"
import Button from "@kiwicom/orbit-components/lib/Button";
import Dialog from "@kiwicom/orbit-components/lib/Dialog";
import InputField from "@kiwicom/orbit-components/lib/InputField"


const initialState = {
    currentPassword: "", 
    newPassword: "",
    confirmNewPassword: "",
    errors: {}
  };

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
    }
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
                                // error={this.state.errors.password}
                                // value={this.state.password}
                                // onChange={this.handlePasswordChange}
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
                                // error={this.state.errors.password}
                                // value={this.state.password}
                                // onChange={this.handlePasswordChange}
                                maxLength="30"
                            />
                        </div>
                        <div className="change-password-item">
                            <span id="change-password-label">Confirm new password</span>
                            <InputField
                                placeholder="type here"
                                type="password"
                                // error={this.state.errors.confirmPassword}
                                // value={this.state.confirmPassword}
                                // onChange={this.handleConfirmPasswordChange}
                                maxLength="30"
                            />
                        </div>
                    </div>
                </div>
                }
                primaryAction={<Button type="primary">Confirm</Button>}
            >
            </Dialog>

        )
    }
}

export default ChangePassword