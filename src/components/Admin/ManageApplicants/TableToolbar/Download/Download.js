import React, { Component } from "react"
import "./Download.css"
import downloadImage from "./download.png"

class Download extends Component {
    render() {
        return (
            <div id="applicant-toolbar-download-flex-container">
                <button
                    id="applicant-toolbar-download-button"
                >
                    <img id="applicant-toolbar-download-icon" src={downloadImage} alt="Download icon" />
                </button>
            </div>
        )
    }
}

export default Download