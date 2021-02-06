import React, { Component } from "react"
import {withRouter} from 'react-router-dom'
import "./Applicant.css"
import applicantInfo from "./ApplicantData.js"
import comments from "./SampleCommentData.js"
import Loading from "@kiwicom/orbit-components/lib/Loading";

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
            currApplicant: null,
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
                commentData: applicantData.comments
            })
        } catch (error) {
            
        }
    }

    handleClick(event) {
        this.props.history.push({
            pathname: '/applicant'
        })
    }

    render() {
        return (
            (this.state.currApplicant) ?
            <div id="applicant-grid-container">
                <Logo />
                <SideNavBar />
                <ApplicantInfoBar applicant = {this.state.currApplicant} handleClick={this.handleClick}/>
                <CommentSection applicant = {this.state.currApplicant} comments = {this.state.commentData} />
                <UploadPhoto applicant = {this.state.currApplicant}/>
                {/* <SortComment /> Getting rid of comment likes so only want to sort by recent */}
                <ApplicantInfoDrop applicant = {this.state.currApplicant}/>
            </div> : <div id="loading-screen"><Loading/></div>
        )
    }
}

export default withRouter(Applicant)