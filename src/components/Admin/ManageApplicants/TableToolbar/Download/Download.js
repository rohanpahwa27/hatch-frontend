import React, { Component } from "react"
import "./Download.css"
import downloadImage from "./download.png"

class Download extends Component {
    render() {
        return (
            <div id="applicant-toolbar-download-flex-container">
                <button
                    id="applicant-toolbar-download-button"
                    onClick={this.props.downloadApplicantsExcel}
                >
                    <img id="applicant-toolbar-download-icon" src={downloadImage} alt="Download icon" />
                    {/* &nbsp;Download */}
                </button>
            </div>
        )
    }
}

export default Download