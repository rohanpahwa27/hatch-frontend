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

    handleClick(event) {
        event.stopPropagation();
        this.props.setShowingProfile(!this.state.showProfile)
        this.setState({
            showProfile: !this.state.showProfile
        });
    }

    closeProfile(event) {
        event.stopPropagation();
        this.props.setShowingProfile(false)
        this.setState({
            showProfile: false
        });
    }

    render() {
        return (
            <div id="profile-side-bar-item">
                {this.state.showProfile ? 
                <div id="applicants-to-profile-link" className="ignore-react-onclickoutside"
                    onClick={(e) => this.handleClick(e)}>
                    <span id="profile-image">
                        <svg width="25" height="25" viewBox="0 0 16 16" fill="#00A991" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 8C12.3284 8 13 8.67157 13 9.5V10C13 11.9714 11.1405 14 8 14C4.85951 14 3 11.9714 3 10V9.5C3 8.67157 3.67157 8 4.5 8H11.5ZM8 1.5C9.51878 1.5 10.75 2.73122 10.75 4.25C10.75 5.76878 9.51878 7 8 7C6.48122 7 5.25 5.76878 5.25 4.25C5.25 2.73122 6.48122 1.5 8 1.5Z" fill="#00A991"/></svg>
                    </span>
                    <span className="color-side-bar-nav-text side-nav-bar-item-text">Profile</span>
                </div>
                
                :<div id="applicants-to-profile-link" className="ignore-react-onclickoutside"
                    onClick={this.state.showProfile ? null: this.handleClick}>
                    <span id="profile-image">
                        <svg width="25" height="25" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 8C12.3284 8 13 8.67157 13 9.5V10C13 11.9714 11.1405 14 8 14C4.85951 14 3 11.9714 3 10V9.5C3 8.67157 3.67157 8 4.5 8H11.5ZM11.5 9H4.5C4.22386 9 4 9.22386 4 9.5V10C4 11.4376 5.43216 13 8 13C10.5678 13 12 11.4376 12 10V9.5C12 9.22386 11.7761 9 11.5 9ZM8 1.5C9.51878 1.5 10.75 2.73122 10.75 4.25C10.75 5.76878 9.51878 7 8 7C6.48122 7 5.25 5.76878 5.25 4.25C5.25 2.73122 6.48122 1.5 8 1.5ZM8 2.5C7.0335 2.5 6.25 3.2835 6.25 4.25C6.25 5.2165 7.0335 6 8 6C8.9665 6 9.75 5.2165 9.75 4.25C9.75 3.2835 8.9665 2.5 8 2.5Z" fill="#212121"/></svg>
                    </span>
                    <span className="side-nav-bar-item-text">Profile</span>
                </div>}
                <Profile showProfile={this.state.showProfile} closeProfile={this.closeProfile}/>
            </div>
        )
    }
}

export default ProfileSideBarItem