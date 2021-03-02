import React, { Component } from "react"
import "./ApplicantInfo.css"

class ApplicantInfo extends Component {
    render() {
        let grayCircleSrc = "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"
        let heart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_regular.svg"
        let filledHeart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_filled.svg"
        let chat = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Chat/SVG/ic_fluent_chat_16_regular.svg"
        let placeholder = ""
        let applicant = this.props.applicant

        let numLikes = applicant.likes.length
        if (this.props.likedApplicant && !(applicant.likes.includes(this.props.member))) {
            numLikes = numLikes + 1
        } else if (!this.props.likedApplicant && (applicant.likes.includes(this.props.member))) {
            numLikes = numLikes - 1
        }

        return (
            <div id="applicant-info-item">
                <img id="applicant-image" src={applicant ? applicant.imageUrl : grayCircleSrc} alt="Applicant icon" />
                <div id="applicant-info-heading-container">
                    <div id="applicant-name">
                        <span>{applicant ? applicant.firstName : placeholder} {applicant ? applicant.lastName : placeholder}</span>
                    </div>
                    <div id="applicant-likes-and-comments-container">
                        <div id="applicant-likes-container">
                            {this.props.likedApplicant ? <img id="applicant-heart-image" src={filledHeart} alt="Like icon"/> :
                            <img id="applicant-heart-image" src={heart} alt="Heart icon" />}
                            <span id="applicant-like-text">{applicant ? numLikes : placeholder} like{numLikes !== 1 ? "s" : ""} </span>
                        </div>
                        <div id="applicant-comments-container">
                            <img id="applicant-chat-image" src={chat} alt="Chat icon" />
                            <span id="applicant-comment-text">{applicant ? this.props.comments.length : placeholder} comment{this.props.comments.length !== 1 ? "s" : ""} </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ApplicantInfo