import React, { Component } from "react"
import "./ProfileSideBarItem.css"
import Profile from "./ShowProfile/ShowProfile"

class ProfileSideBarItem extends Component {
    constructor(props) {
        super(props);
        this.state = {showProfile: false};
    
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.closeProfile = this.closeProfile.bind(this)
    }

    handleClick() {
        this.setState({
            showProfile: true
        });
    }

    closeProfile() {
        this.setState({
            showProfile: false
        });
    }

    render() {
        let person = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Person/SVG/ic_fluent_person_16_regular.svg"
        return (
            <div id="profile-side-bar-item">
                <div id="applicants-to-profile-link"
                    onClick={this.handleClick}>
                    <img id="profile-image" src={person} alt="Profile icon" />
                    <span>Profile</span>
                </div>
                <Profile showProfile={this.state.showProfile} closeProfile={this.closeProfile}/>
            </div>
        )
    }
}

export default ProfileSideBarItem