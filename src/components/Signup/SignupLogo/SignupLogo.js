import React, { Component } from "react";
import logo from "../../Logo/hatch.png"
import "./SignupLogo.css"

class SignupLogo extends Component {
    render() {
        return (
            <div id="logo-div">
                {/* <img id="logo" className = "signupLogo" src={logo} alt="Hatch" /> */}
                <img className = "signupLogo" src={logo} alt="Hatch" />
            </div>
        )
    }
}

export default SignupLogo