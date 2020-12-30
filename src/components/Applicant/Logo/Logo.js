import React, { Component } from "react";
import logo from "./hatch.png"
import "./Logo.css"

class Logo extends Component {
    render() {
        return (
            <div id="logo-div">
                <img id="logo" src={logo} alt="Hatch" />
            </div>
        )
    }
}

export default Logo