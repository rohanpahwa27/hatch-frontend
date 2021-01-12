import React, { Component } from "react"
import "./HomeSideBarItem.css"
import { NavLink } from "react-router-dom";

class HomeSideBarItem extends Component {
    render() {
        let home = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Home/SVG/ic_fluent_home_16_regular.svg"

        return (
            <div id="home-side-bar-item">
                <NavLink
                    id="applicants-to-home-link"
                    to="/home">
                    <img id="home-image" src={home} alt="Home icon" />
                    <span>Home</span>
                </NavLink>
            </div>
        )
    }
}

export default HomeSideBarItem