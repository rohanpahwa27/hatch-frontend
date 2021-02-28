import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./hatch.png"
import "./Logo.css"

class Logo extends Component {
    render() {
        return (
            <div id="logo-grid-container">
                <Link to="/home">
                    <img id="logo" src={logo} alt="Hatch" />
                </Link>
            </div>
        )
    }
}

export default Logo