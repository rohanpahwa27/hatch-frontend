import React, { Component } from "react"
import "./SideNavBar.css"
import AdminSideBarItem from "./AdminSideBarItem/AdminSideBarItem.js"
import AccountSideBarItem from "./AccountSideBarItem/AccountSideBarItem.js"

class SideNavBar extends Component {
    render() {
        return (
            <div id="sidenavbar">
                <AdminSideBarItem />
                <AccountSideBarItem />
            </div>
        )
    }
}

export default SideNavBar