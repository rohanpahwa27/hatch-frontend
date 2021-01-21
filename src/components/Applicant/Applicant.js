import React, { Component } from "react"
import "./Applicant.css"
import applicantInfo from "./ApplicantData.js"
import comments from "./SampleCommentData.js"

import Logo from "./Logo/Logo.js"
import SideNavBar from "../SideNavBar/SideNavBar"
import ApplicantInfoBar from "./ApplicantInfoBar/ApplicantInfoBar.js"
import ApplicantInfoDrop from "./ApplicantInfoDrop/ApplicantInfoDrop.js"
import UploadPhoto from "./UploadPhoto/UploadPhoto.js"
import CommentSection from "./ApplicantComments/CommentSection"

import api from "../../Api/api"

class Applicant extends Component {
    constructor() {
        super()
        this.state = {
            commentData: comments,
            allApplicants: applicantInfo,
            currApplicant: applicantInfo,
            numApplicantsShowing: 1
        }

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount = async () => {
        try {
            const applicantID = this.props.location.state.id;
            const applicantResponse = await api.getApplicantById(applicantID);
            const applicantData = applicantResponse.data.applicant;
            this.setState({
                currApplicant: applicantData,
                commentData: applicantData.comments,
            })
        } catch (error) {
            
        }

        const orgId = localStorage.getItem("orgID");
        api.getApplicantsInOrg(orgId)
            .then(res => {
                const applicants = res.data.applicants.map(applicant => {
                    const applicantInfo = {
                        firstName: applicant.firstName,
                        lastName: applicant.lastName,
                        email: applicant.email,
                        likes: Math.floor(Math.random() * 50),
                        comments: Math.floor(Math.random() * 20),
                        extraFields: applicant.extraFields,
                        status: applicant.status,
                        recruitingCycle: applicant.recruitingCycle,
                        organization: applicant.organization,
                        imgurl: "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"
                    }
                    return applicantInfo
                })

                this.setState({
                    allApplicants: applicants,
                    numApplicantsShowing: applicants.length,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    findApplicantBasedOnId() {
        
    }

    handleClick(event, data) {
        console.log(data)
        this.props.history.push({
            pathname: '/applicant',
            state: { appID: data }
        })
    }

    render() {
        let appID = Math.floor(Math.random() * (this.state.numApplicantsShowing - 1));
        return (
            <div id="applicant-grid-container">
                <Logo />
                <SideNavBar />
                <ApplicantInfoBar data = {this.state.currApplicant} ID = {appID} handleClick={this.handleClick}/>
                <CommentSection data = {this.state.commentData} />
                <UploadPhoto data = {this.state.currApplicant} ID = {appID}/>
                {/* <SortComment /> Getting rid of comment likes so only want to sort by recent */}
                <ApplicantInfoDrop data = {this.state.currApplicant} ID = {appID}/>
            </div>
        )
    }
}

export default Applicant