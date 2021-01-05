import React, { Component } from "react"
import "./AdminSideBarItem.css"

class AdminSideBarItem extends Component {
    render() {
        let person = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Settings/SVG/ic_fluent_settings_16_regular.svg"
        return (
            <div id="admin-side-bar-item">
                <img id="admin-side-image" src={person} alt="Admin icon" />
                <span>Admin</span>
            </div>
        )
    }
}

export default AdminSideBarItem