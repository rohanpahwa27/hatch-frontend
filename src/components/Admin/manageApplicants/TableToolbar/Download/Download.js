import React, { Component } from "react"
import "./Download.css"
import downloadImage from "./download.png"

class Download extends Component {
    render() {
        return (
            <div id="download-flex-container">
                <img id="download-icon" src={downloadImage} alt="Download icon" />
            </div>
        )
    }
}

export default Download