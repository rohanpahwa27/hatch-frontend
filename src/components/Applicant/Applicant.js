import React, { Component } from "react"
import {withRouter} from 'react-router-dom'
import Loading from "@kiwicom/orbit-components/lib/Loading";

import SideNavBar from "../SideNavBar/SideNavBar"
import Logo from "../Page/Logo/Logo.js";

import ApplicantInfoBar from "./ApplicantInfoBar/ApplicantInfoBar.js"
import ApplicantInfoDrop from "./ApplicantInfoDrop/ApplicantInfoDrop.js"
import UploadPhoto from "./UploadPhoto/UploadPhoto.js"
import NewComment from "./NewComment/NewComment.js"
import CommentSection from "./CommentSection/CommentSection"

import api from "../../Api/api"

import "./Applicant.css"

class Applicant extends Component {
    constructor() {
        super()
        this.state = {
            commentData: null,
            allApplicants: null,
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
          <div id="page-grid-container">
            <Logo />
            <SideNavBar />
            <div id="applicant-grid-container">
                <ApplicantInfoBar applicant = {this.state.currApplicant} handleClick={this.handleClick}/>
                <CommentSection applicant = {this.state.currApplicant} comments = {this.state.commentData} />
                <div id="applicant-side-features-container">
                    <UploadPhoto applicant = {this.state.currApplicant}/>
                    {/* <SortComment /> Getting rid of comment likes so only want to sort by recent */}
                    <ApplicantInfoDrop applicant = {this.state.currApplicant}/>
                </div>
                <NewComment applicant={this.props.applicant} />
            </div>
          </div> : <div id="loading-screen"><Loading/></div>
        )
      }
}

export default withRouter(Applicant)