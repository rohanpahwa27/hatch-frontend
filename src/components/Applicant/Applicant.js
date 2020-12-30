import React, { Component } from "react"
import "./Applicant.css"
import applicantData from "./ApplicantData.js"

import Logo from "./Logo/Logo.js"
import SideNavBar from "./SideNavBar/SideNavBar.js"
import ApplicantInfoBar from "./ApplicantInfoBar/ApplicantInfoBar.js"
import ApplicantComment from "./ApplicantComments/ApplicantComment.js"
import SortComment from "./SortComment/SortComment.js"
import ApplicantInfoDrop from "./ApplicantInfoDrop/ApplicantInfoDrop.js"
import UploadPhoto from "./UploadPhoto/UploadPhoto.js"

class Applicant extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div id="applicant-grid-container">
                <Logo />
                <SideNavBar />
                <ApplicantInfoBar />
                <ApplicantComment />
                <UploadPhoto />
                <SortComment />
                <ApplicantInfoDrop />
            </div>
        )
    }
}

export default Applicant