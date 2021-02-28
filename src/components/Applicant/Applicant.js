import React, { Component } from "react"
import {withRouter} from 'react-router-dom'
import Loading from "@kiwicom/orbit-components/lib/Loading";

import Logo from "../Logo/Logo"
import SideNavBar from "../SideNavBar/SideNavBar"
import LikeInfoBarItem from "./ProfileActions/LikeInfoBarItem/LikeInfoBarItem.js"
import NextInfoBarItem from "./ProfileActions/NextInfoBarItem/NextInfoBarItem.js"
import ApplicantInfo from "./ApplicantInfo/ApplicantInfo.js"
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
            currMemberId: null,
            currApplicantPreCall: window.location.search ? window.location.search.substring(1, window.location.search.length) : this.props.location.state.id,
            currApplicantId: null,
            currApplicantLikedByMember: null,
            currApplicantComments: null,
            currApplicantData: null,
            allApplicants: null,
            allApplicantIds: null,
            likedApplicant: false, // TODO: old changes from applicant info bar
            liveLikeStaus: false,
            commentChange: false
        }

        this.handleNext = this.handleNext.bind(this)
        this.handleLike = this.handleLike.bind(this)
        this.handleNewComment = this.handleNewComment.bind(this)
    }

    componentDidMount = async () => {
        // TODO: if (set timer for a certain time because otherwise we may want to refresh instead of using old data)
        if (!this.state.allApplicants) {
            // Applicant page called by Home / direct URL and not next
            const applicantId = this.state.currApplicantPreCall;
            const orgId = localStorage.getItem("orgID");
            const memberId = await api.getThisMember();

            const applicantLike = await api.didMemberLikeApplicant(applicantId);
            const allApplicantsResponse = await api.getApplicantsInOrg(orgId);
            const applicantData = allApplicantsResponse.data.applicants.map(applicant => {
                const applicantInfo = {
                    id: applicant._id,
                    firstName: applicant.firstName,
                    lastName: applicant.lastName,
                    email: applicant.email,
                    comments: applicant.comments,
                    likes: applicant.likes,
                    extraFields: applicant.extraFields,
                    status: applicant.status,
                    recruitingCycle: applicant.recruitingCycle,
                    organization: applicant.organization,
                    imageUrl: applicant.imageUrl ? applicant.imageUrl : "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"
                }
                return applicantInfo
            });

            const applicantIds = applicantData.map(x => x.id);
            const currApplicantData = applicantData.find(x => x.id == applicantId);
            if (currApplicantData == null) {
                // TODO: HANDLE "bad" urls with fake search terms, CHECK for valid ids aka ones that are in applicantData
            }
    
            this.setState({
                currMemberId: memberId.data.member._id,
                currApplicantId: applicantId,
                currApplicantLikedByMember: applicantLike.data.like,
                currApplicantData: currApplicantData,
                currApplicantComments: currApplicantData.comments,
                allApplicants: applicantData,
                allApplicantIds: applicantIds,
                likedApplicant: applicantLike.data.like ^ this.state.liveLikeStatus
            });
        } else if (this.state.commentChange) {
            const commentsResponse = await api.getComments(this.state.currApplicantId);
            this.setState({
                currApplicantComments: commentsResponse.data.comments,
                commentChange: false
            });
        } else {
            // Applicant page called by next, need to only update the currApplicantInfo
            const currApplicantData = this.state.allApplicants.find(x => x.id == this.state.currApplicantId);
            const applicantLike = await api.didMemberLikeApplicant(this.state.currApplicantId);
            this.setState({
                currApplicantLikedByMember: applicantLike.data.like,
                currApplicantComments: currApplicantData.comments,
                currApplicantData: currApplicantData
            });
        }
    }

    handleNext = () => {
        // TODO: Fix slight bug where the first next click doesn't work
        const currIndex = this.state.allApplicantIds.findIndex(id => id === this.state.currApplicantId)
        if (currIndex === -1) {
            // TODO: Add a proper error state
            // console.log("yikes this is an issue for applicant")
        }
        this.setState({
            currApplicantId: currIndex != (this.state.allApplicantIds.length - 1) && currIndex != -1 ? this.state.allApplicantIds[currIndex + 1] : this.state.allApplicantIds[0]
        }, () => {this.componentDidMount()});
    }

    handleLike = async () => {
        this.setState({
            liveLikeStatus: !this.state.liveLikeStatus,
            likedApplicant: !(this.state.currApplicantLikedByMember && this.state.liveLikeStatus)
        });
        await api.changeMemberLikeApplicant(this.props.applicant._id);
        this.componentDidMount();
    }
    
    handleNewComment = () => {
        this.setState({
            commentChange: true
        });
        this.componentDidMount()
    }

    handleDelete = () => {
        this.setState({
            commentChange: true
        });
        this.componentDidMount()
    }

    render() {
        return (
        (this.state.currApplicantPreCall) ?
            (this.state.currApplicantData) ?
                <div id="page-grid-container">
                    <Logo />
                    <SideNavBar />
                    <div id="applicant-grid-container">
                        <div id="info-container">
                            <div id="applicantinfobar">
                                <ApplicantInfo applicant={this.state.currApplicantData} likedApplicant={this.state.likedApplicant} originallyLiked={this.state.currApplicantLikedByMember} comments = {this.state.currApplicantComments}/>
                            </div>
                            <div id="applicant-action-container">
                                <LikeInfoBarItem applicantID={this.state.currApplicantId} likedApplicant={this.state.likedApplicant} handleLike={this.handleLike}/>
                                <NextInfoBarItem handleNext={this.handleNext}/>
                            </div>
                        </div>
                        <div id="content-container">
                            <CommentSection applicant = {this.state.currApplicantData} comments = {this.state.currApplicantComments} member={this.state.currMemberId} handleDelete={this.handleDelete}/>
                            <div id="applicant-side-features-container">
                                <UploadPhoto applicant = {this.state.currApplicantData}/>
                                {/* <SortComment /> Getting rid of comment likes so only want to sort by recent */}
                                <ApplicantInfoDrop applicant = {this.state.currApplicantData}/>
                            </div>
                        </div>
                        <NewComment applicantID={this.state.currApplicantId} handleNewComment={this.handleNewComment}/>
                    </div>
                </div> : <div id="loading-screen"><Loading/></div>
            : <span>Page does not exist {this.state.currApplicantPreCall}</span> // TODO: Replace this eventually...
        )
      }
}

export default withRouter(Applicant)