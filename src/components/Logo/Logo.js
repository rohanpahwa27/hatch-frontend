import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./hatch.png"
import "./Logo.css"

class Logo extends Component {
    render() {
        return (
            <Link to="/home">
                <div id="logo-grid-container">
                    <img id="logo" src={logo} alt="Hatch" />
                </div>
            </Link>
        )
    }
}

export default Logo