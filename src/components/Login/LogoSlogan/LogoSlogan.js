import React, { Component } from "react"
import logo from "./Icons/hatch.png"
import "./LogoSlogan.css"

class LogoSlogan extends Component {
    render() {
        return (
            <div id="logo-slogan-container">
                <img src={logo} alt="hatch logo" />
                <h6>Recruiting the future, together.</h6>
            </div>
        )
    }
}

export default LogoSlogan