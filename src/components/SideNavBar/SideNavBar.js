import React, { Component } from "react"
import "./SideNavBar.css"
import AdminSideBarItem from "./AdminSideBarItem/AdminSideBarItem.js"
import ProfileSideBarItem from "./ProfileSideBarItem/ProfileSideBarItem.js"
import HomeSideBarItem from "./HomeSideBarItem/HomeSideBarItem.js"
import { NavLink } from "react-router-dom";

class SideNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingProfile: false
        };
        this.setShowingProfile = this.setShowingProfile.bind(this);
    }

    setShowingProfile(setToThis){
        this.setState({showingProfile: setToThis})
    }

    render() {
        //if profile and other item shouldn't be, then gotta pull up the profile state
        return (
            <div id="sidenavbar">
                <HomeSideBarItem showingProfile={this.state.showingProfile}/>
                <ProfileSideBarItem setShowingProfile={this.setShowingProfile}/>
                <AdminSideBarItem showingProfile={this.state.showingProfile}/>
            </div>
        )
    }
}

export default SideNavBar