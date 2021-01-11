import React, { Component } from "react"
import "./ShowProfile.css"
import Button from "@kiwicom/orbit-components/lib/Button";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import ChangePassword from "./ChangePassword/ChangePassword"
import DeleteAccount from "./DeleteAccount/DeleteAccount"
import EditPicture from "./EditPicture/EditPicture"
import { withRouter } from "react-router-dom";
import onClickOutside from "react-onclickoutside";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteAccount: false,
            changePassword: false,
            editPicture: false
        };
        this.closeButtonDeleteAccount = this.closeButtonDeleteAccount.bind(this);
        this.closeButtonChangePassword = this.closeButtonChangePassword.bind(this);
        this.closeButtonEditPicture = this.closeButtonEditPicture.bind(this)
    }

    handleClickOutside = (event) => {
        if (this.props.showProfile && !this.state.deleteAccount && !this.state.editPicture && !this.state.changePassword) this.props.closeProfile(event)
    }

    deleteAccount(){
        this.setState({deleteAccount: true})
    }

    closeButtonDeleteAccount(){
        this.setState({deleteAccount: false})
    }

    changePassword(){
        this.setState({changePassword: true})
    }

    closeButtonChangePassword(){
        this.setState({changePassword: false})
    }

    editPicture(){
        this.setState({editPicture: true})
    }

    closeButtonEditPicture(){
        this.setState({editPicture: false})
    }


    logout(){
        //clear cookies or whatever authentication we use
        this.props.history.push("/login");
    }

    render() {
        let grayCircleSrc = "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"
        return (
            (this.props.showProfile) ?
            <div id="profile-container">
                <div id="profile-card">
                    <div id="profile-flex-container">
                        <div id="profile-name-org-attributes">
                            <span id="profile-name"> Name </span>
                            <span id="profile-organization-name"> Org Name </span>
                        </div>
                        <div id="profile-picture-flex"></div>
                        <div>
                            <span id="profile-edit-picture-button" onClick={(e) => this.editPicture()}>Edit</span>
                            <img id="show-profile-image" src={grayCircleSrc} alt="Applicant icon" />
                        </div>
                    </div>
                    <span id="profile-title"> Contribution </span>
                    <div id="profile-flex-container" className="profile-attributes-padding">
                        <span id="" className="profile-likes-comments-attribute">71</span> <span id="profile-likes-attribute">likes</span>
                        <span className="profile-likes-comments-attribute">32</span> <span id="profile-likes-attribute">comments</span>
                    </div>
                    <div id="profile-flex-container" className="profile-attributes-padding">
                        <span id="profile-title" className="profile-email-admin-title-attribute"> Email </span>
                    </div>
                    <span className="profile-email-admin-attribute"> joshlee@uw.edu </span>

                    <div id="profile-flex-container" className="profile-attributes-padding">
                        <span id="profile-title" className="profile-email-admin-title-attribute"> Account </span>
                    </div>
                    <span className="profile-email-admin-attribute"> Administrator </span>

                    <div id="profile-flex-container" className="profile-buttons-padding">
                        <div id="profile-logout-button">
                            <Button size="small" type="secondary" onClick={(e) => this.logout(e)}>
                                Log Out
                            </Button>
                        </div>
                        <div>
                            <Button size="small" type="secondary" onClick={(e) => this.changePassword(e)}>
                                Change your password
                            </Button>
                        </div>
                    </div>

                    <div id="delete-profile-button-padding">
                        <div>
                            <ButtonLink size="small" type="critical" onClick={(e) => this.deleteAccount(e)}>
                                Delete your account
                            </ButtonLink>
                        </div>
                    </div>
                    
                    {this.state.changePassword
                        ? <ChangePassword closeButton={this.closeButtonChangePassword} />
                        : null
                    }

                    {this.state.deleteAccount
                        ? <DeleteAccount closeButton={this.closeButtonDeleteAccount} />
                        : null
                    }

                    {this.state.editPicture
                        ? <EditPicture closeButton={this.closeButtonEditPicture} />
                        : null
                    }
                </div>
            </div> : null
        )
    }
}

export default withRouter(onClickOutside(Profile))