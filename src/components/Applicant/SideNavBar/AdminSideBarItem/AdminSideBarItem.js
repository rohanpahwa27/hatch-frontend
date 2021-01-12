import React, { Component } from "react"
import "./AdminSideBarItem.css"
import { NavLink } from "react-router-dom";

class AdminSideBarItem extends Component {
    render() {
        let person = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Settings/SVG/ic_fluent_settings_16_regular.svg"
        return (
            <div id="admin-side-bar-item">
                <NavLink
                    id="applicants-to-admin-link"
                    to="/manage">
                    <img id="admin-side-image" src={person} alt="Admin icon" />
                    <span>Admin</span>
                </NavLink>
            </div>
        )
    }
}

export default AdminSideBarItem