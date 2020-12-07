import React, { Component } from "react";
import "./Home.css"

import Table from "./Table/Table.js";
import Logo from "./Logo/Logo.js"

class Home extends Component {
    render() {
        return (
            <div id="home-grid-container">
                <Logo />
                <Table />
            </div>
        )
    }
}

export default Home