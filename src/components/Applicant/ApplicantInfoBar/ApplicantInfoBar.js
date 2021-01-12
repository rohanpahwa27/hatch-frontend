import React, { Component } from "react"
import "./ApplicantInfoBar.css"
import LikeInfoBarItem from "./ProfileActions/LikeInfoBarItem/LikeInfoBarItem.js"
import NextInfoBarItem from "./ProfileActions/NextInfoBarItem/NextInfoBarItem.js"
import ApplicantInfo from "./ApplicantInfo/ApplicantInfo.js"

class ApplicantInfoBar extends Component {
    render() {
        return (
            <div id="applicantinfobar">
                {/* Add another div inside to separate profile info and actions */}
                <ApplicantInfo data={this.props.data} ID = {this.props.ID}/>
                <LikeInfoBarItem />
                <NextInfoBarItem handleClick={this.props.handleClick} ID = {this.props.ID}/>
            </div>
        )
    }
}

export default ApplicantInfoBar