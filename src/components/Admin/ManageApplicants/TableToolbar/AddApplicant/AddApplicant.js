import React, { Component } from "react"
import "./AddApplicant.css"
import addApplicantImage from "./addApplicant.png"

class AddApplicant extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="applicant-toolbar-add-applicant-flex-container">
                <button
                    id="applicant-toolbar-add-applicant-button"
                    onClick={this.props.toggleShowImport}
                >
                    <img id="applicant-toolbar-add-applicant-icon" src={addApplicantImage} alt="Add Applicant icon" />
                    {/* &nbsp;Add applicants */}
                </button>
            </div>
        )
    }
}

export default AddApplicant