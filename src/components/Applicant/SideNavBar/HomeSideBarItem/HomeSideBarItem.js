import React, { Component } from "react"
import "./HomeSideBarItem.css"

class HomeSideBarItem extends Component {
    render() {
        let home = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Home/SVG/ic_fluent_home_16_regular.svg"

        return (
            <div id="home-side-bar-item">
                <img id="home-image" src={home} alt="Home icon" />
                <span>Home</span>
            </div>
        )
    }
}

export default HomeSideBarItem