import React, { Component } from "react"
import "./Filter.css"
import filterImage from "./filter.png"

class Filter extends Component {
    render() {
        return (
            <div id="toolbar-filter-flex-container">
                <img id="toolbar-filter-icon" src={filterImage} alt="Filter icon" />
            </div>
        )
    }
}

export default Filter