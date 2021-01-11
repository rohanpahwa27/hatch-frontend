import React, { Component } from "react"
import "./HomeSideBarItem.css"
import { withRouter } from "react-router-dom";

class HomeSideBarItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.history.push("/home");
    }
    render() {
        let home = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Home/SVG/ic_fluent_home_16_regular.svg"

        return (
            <div id="home-side-bar-item" onClick={this.handleClick}>
                <img id="home-image" src={home} alt="Home icon" />
                <span>Home</span>
            </div>
        )
    }
}

export default withRouter(HomeSideBarItem)