import React, { Component } from "react";
import "./Home.css"

import Table from "./Table/Table.js";

class Home extends Component {
    render() {
        return (
            <div id="home-grid-container">
                <Table />
            </div>
        )
    }
}

export default Home