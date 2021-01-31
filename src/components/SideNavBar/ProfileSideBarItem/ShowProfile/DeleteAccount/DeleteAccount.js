import React, { Component } from "react"
import "./DeleteAccount.css"
import Close from "@kiwicom/orbit-components/lib/icons/Close"
import Button from "@kiwicom/orbit-components/lib/Button";
import Dialog from "@kiwicom/orbit-components/lib/Dialog";
import { withRouter } from "react-router-dom";
import api from "../../../../../Api/api"

class DeleteAccount extends Component {
    deleteAccount = async () => {
        await api.removeMember()
        this.props.history.push("/login");
    }
    render() {
        return (
            <Dialog
                title={
                <div>
                    <div id="change-password-flex-container">
                        <span id="change-password">Delete your account</span>
                        <span id="close-button-change-password" onClick={this.props.closeButton}><Close/></span>
                    </div>
                    <div className="delete-account-padding">
                        <span id="delete-account-text">Are you sure you want to delete your Hatch account?<br></br>This action cannot be undone.</span>
                    </div>
                </div>
                }
                primaryAction={<Button size="small" type="critical" onClick={(e) => this.deleteAccount()}>Yes, delete my account</Button>}
                secondaryAction={<Button size="small" type="white" onClick={this.props.closeButton}>No, I love using Hatch</Button>}
            >
            </Dialog>

        )
    }
}

export default withRouter(DeleteAccount)