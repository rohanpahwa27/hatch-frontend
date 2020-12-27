import React, { Component } from "react"
import "./ShowingApplicantsLabel.css"

class ShowingApplicantsLabel extends Component {
    render() {
        return (
            <div id="toolbar-showing-x-applicants">
                <span>Showing {this.props.numApplicantsShowing} of {this.props.totalApplicants} applicants</span>
            </div>
        )
    }
}

export default ShowingApplicantsLabel