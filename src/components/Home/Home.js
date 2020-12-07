import React, { Component } from "react";
import "./Home.css"

import Table from "./Table/Table.js";
import Logo from "./Logo/Logo.js"
import SideNavBar from "./SideNavBar/SideNavBar.js"

class Home extends Component {
    render() {
        return (
            <div id="home-grid-container">
                <Logo />
                <SideNavBar />
                <Table />
            </div>
        )
    }
}

export default Home