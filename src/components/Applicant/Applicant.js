import React, { Component } from "react"
import {withRouter} from 'react-router-dom'
import Loading from "@kiwicom/orbit-components/lib/Loading";

import SideNavBar from "../SideNavBar/SideNavBar"
import Logo from "../Logo/Logo.js";

import ApplicantInfoBar from "./ApplicantInfoBar/ApplicantInfoBar.js"
import ApplicantInfoDrop from "./ApplicantInfoDrop/ApplicantInfoDrop.js"
import UploadPhoto from "./UploadPhoto/UploadPhoto.js"
import NewComment from "./NewComment/NewComment.js"
import CommentSection from "./CommentSection/CommentSection"

import api from "../../Api/api"

import "./Applicant.css"
import { colProperties } from "@fluentui/react";

class Applicant extends Component {
    constructor() {
        super()
        this.state = {
            memberId: null,
            commentData: null,
            allApplicants: null,
            currApplicant: null,
            applicantLiked: null,
            numApplicantsShowing: 1,
            currApplicantPreCall: window.location.search ? window.location.search.substring(1, window.location.search.length) : this.props.location.state.id
        }

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount = async () => {
        // TODO: HANDLE "bad" urls with fake search terms
        try {
            const applicantID = this.state.currApplicantPreCall;
            const applicantResponse = await api.getApplicantById(applicantID);
            const applicantLike = await api.didMemberLikeApplicant(applicantID);
            const memberId = await api.getThisMember();

            const applicantData = applicantResponse.data.applicant;
            this.setState({
                currApplicant: applicantData,
                commentData: applicantData.comments,
                applicantLiked: applicantLike.data.like,
                memberId: memberId.data.member._id
            });
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
        (this.state.currApplicantPreCall) ?
            (this.state.currApplicant) ?
            <div id="page-grid-container">
                <Logo />
                <SideNavBar />
                <div id="applicant-grid-container">
                    <ApplicantInfoBar applicant = {this.state.currApplicant} handleClick={this.handleClick} applicantLike={this.state.applicantLiked}/>
                    <CommentSection applicant = {this.state.currApplicant} comments = {this.state.commentData} member={this.state.memberId}/>
                    <div id="applicant-side-features-container">
                        <UploadPhoto applicant = {this.state.currApplicant}/>
                        {/* <SortComment /> Getting rid of comment likes so only want to sort by recent */}
                        <ApplicantInfoDrop applicant = {this.state.currApplicant}/>
                    </div>
                    <NewComment applicant={this.state.currApplicant} />
                </div>
            </div> : <div id="loading-screen"><Loading/></div>
            : <span>Page does not exist</span> // TODO: Replace this eventually...
        )
      }
}

export default withRouter(Applicant)