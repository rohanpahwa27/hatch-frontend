import React, { Component } from "react";
import logo from "./hatch.png"
import "./Logo.css"
import { NavLink } from "react-router-dom";

class Logo extends Component {
    render() {
        return (
            <div id="logo-div">
                <NavLink
                    id="logo-link"
                    to="/home">
                    <img id="logo" src={logo} alt="Hatch" />
                </NavLink>
            </div>
        )
    }
}

export default Logo