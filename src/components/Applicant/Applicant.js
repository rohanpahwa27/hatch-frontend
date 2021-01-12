import React, { Component } from "react"
import "./Applicant.css"
import applicantInfo from "./ApplicantData.js"
import comments from "./SampleCommentData.js"
// import { useHistory } from "react-router-dom";

import Logo from "./Logo/Logo.js"
import SideNavBar from "../SideNavBar/SideNavBar"
import ApplicantInfoBar from "./ApplicantInfoBar/ApplicantInfoBar.js"
import ApplicantInfoDrop from "./ApplicantInfoDrop/ApplicantInfoDrop.js"
import UploadPhoto from "./UploadPhoto/UploadPhoto.js"
import CommentSection from "./ApplicantComments/CommentSection"

class Applicant extends Component {
    constructor() {
        super()
        this.state = {
            commentData: comments,
            applicantData: applicantInfo
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event, data) {
        console.log(data)
        this.props.history.push({
            pathname: '/applicant',
            state: { appID: data }
        })
    }

    render() {
        return (
            <div id="applicant-grid-container">
                <Logo />
                <SideNavBar />
                <ApplicantInfoBar data = {this.state.applicantData} ID = {this.props.location.state.appID} handleClick={this.handleClick}/>
                <CommentSection data = {this.state.commentData} />
                <UploadPhoto />
                {/* <SortComment /> Getting rid of comment likes so only want to sort by recent */}
                <ApplicantInfoDrop data = {this.state.applicantData} ID = {this.props.location.state.appID}/>
            </div>
        )
    }
}

export default Applicant