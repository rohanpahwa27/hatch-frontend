import React, { Component } from "react"
import "./AddApplicant.css"
import addApplicantImage from "./addApplicant.png"

class AddApplicant extends Component {
    render() {
        return (
            <div id="add-applicant-flex-container">
                <img id="add-applicant-icon" src={addApplicantImage} alt="AddApplicant icon" />
            </div>
        )
    }
}

export default AddApplicant