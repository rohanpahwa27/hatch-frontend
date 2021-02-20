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
            memberId: null,
            commentData: null,
            allApplicants: null,
            currApplicant: null,
            applicantLiked: null,
            ids: null,
            currApplicantPreCall: window.location.search ? window.location.search.substring(1, window.location.search.length) : this.props.location.state.id
        }

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount = async () => {
        // TODO: HANDLE "bad" urls with fake search terms
        // TODO: don't call applicant by ID API but instead index + have that info on hand (cache it)
        try {
            const orgId = localStorage.getItem("orgID");
            const applicantID = this.state.currApplicantPreCall;
            const applicantResponse = await api.getApplicantById(applicantID);
            const applicantLike = await api.didMemberLikeApplicant(applicantID);
            const memberId = await api.getThisMember();
            const applicants = await api.getApplicantsInOrg(orgId);
            const ids = applicants.data.applicants.map(applicant => {
                const applicantInfo = {
                    id: applicant._id
                }
                return applicantInfo
            });
            const applicantData = applicantResponse.data.applicant;
    
            this.setState({
                currApplicant: applicantData,
                commentData: applicantData.comments,
                applicantLiked: applicantLike.data.like,
                memberId: memberId.data.member._id,
                ids: ids
            });
        } catch (error) {
            
        }
    }

    handleClick() {
        const id = this.state.ids[this.state.indexOf(this.state.currApplicantPreCall)]
        this.props.history.push({
            pathname: '/applicant',
            search: id,
            state: {id: id}
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