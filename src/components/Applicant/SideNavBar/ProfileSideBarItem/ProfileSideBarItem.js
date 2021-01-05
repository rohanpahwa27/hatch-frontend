import React, { Component } from "react"
import "./ProfileSideBarItem.css"

class ProfileSideBarItem extends Component {
    render() {
        let person = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Person/SVG/ic_fluent_person_16_regular.svg"
        return (
            <div id="profile-side-bar-item">
                <img id="profile-image" src={person} alt="Profile icon" />
                <span>Profile</span>
            </div>
        )
    }
}

export default ProfileSideBarItem