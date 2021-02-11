import React, { Component } from "react"
import "./ApplicantInfoBar.css"
import LikeInfoBarItem from "./ProfileActions/LikeInfoBarItem/LikeInfoBarItem.js"
import NextInfoBarItem from "./ProfileActions/NextInfoBarItem/NextInfoBarItem.js"
import ApplicantInfo from "./ApplicantInfo/ApplicantInfo.js"

class ApplicantInfoBar extends Component {
    render() {
        return (
            <div id="applicantinfobar">
                <ApplicantInfo applicant={this.props.applicant}/>
                <div id="applicant-action-container">
                    <LikeInfoBarItem applicantID={this.props.applicant._id}/>
                    <NextInfoBarItem handleClick={this.props.handleClick}/>
                </div>
            </div>
        )
    }
}

export default ApplicantInfoBar