import React, { Component } from "react"
import "./AdminSideBarItem.css"
import image from "./people-settings.png"

class AdminSideBarItem extends Component {
    render() {
        return (
            <div id="admin-side-bar-item">
                <img id="admin-image" src={image} alt="Admin icon" />
                <span>Admin</span>
            </div>
        )
    }
}

export default AdminSideBarItem