import React, { Component } from "react"
import "./SideNavBar.css"
import AdminSideBarItem from "./AdminSideBarItem/AdminSideBarItem.js"
import ProfileSideBarItem from "./ProfileSideBarItem/ProfileSideBarItem.js"
import HomeSideBarItem from "./HomeSideBarItem/HomeSideBarItem.js"
import { NavLink } from "react-router-dom";

class SideNavBar extends Component {
    render() {
        return (
            <div id="sidenavbar">
                <HomeSideBarItem />
                <ProfileSideBarItem />
                <AdminSideBarItem />
            </div>
        )
    }
}

export default SideNavBar