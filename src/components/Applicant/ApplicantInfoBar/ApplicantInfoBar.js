import React, { Component } from "react"
import "./ApplicantInfoBar.css"
import LikeInfoBarItem from "./ProfileActions/LikeInfoBarItem/LikeInfoBarItem.js"
import NextInfoBarItem from "./ProfileActions/NextInfoBarItem/NextInfoBarItem.js"
import ApplicantInfo from "./ApplicantInfo/ApplicantInfo.js"

import api from "../../../Api/api"

class ApplicantInfoBar extends Component {
    constructor() {
        super()
        this.state = {
            liveLikeStatus: false,
            likedApplicant: false
        }

        this.handleLike = this.handleLike.bind(this)
    }

    componentDidMount = () => {
        this.setState({
            likedApplicant: this.props.applicantLike ^ this.state.liveLikeStatus
        });
    }

    handleLike = async () => {
        this.setState({
            liveLikeStatus: !this.state.liveLikeStatus,
            likedApplicant: !(this.props.applicantLike && this.state.liveLikeStatus)
        });
        await api.changeMemberLikeApplicant(this.props.applicant._id);
        this.componentDidMount();
    }

    render() {
        return (
            (this.props.applicantLike != null) ?
            <div id="applicantinfobar">
                <ApplicantInfo applicant={this.props.applicant} likedApplicant={this.state.likedApplicant} originallyLiked={this.props.applicantLike}/>
                <div id="applicant-action-container">
                    <LikeInfoBarItem applicantID={this.props.applicant._id} likedApplicant={this.state.likedApplicant} handleLike={this.handleLike}/>
                    <NextInfoBarItem handleClick={this.props.handleClick}/>
                </div>
            </div> : null
        )
    }
}

export default ApplicantInfoBar