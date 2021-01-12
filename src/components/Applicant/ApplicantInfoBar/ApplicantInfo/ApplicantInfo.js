import React, { Component } from "react"
import "./ApplicantInfo.css"
// import { MailIcon, SettingsIcon } from '@fluentui/react-icons';

class ApplicantInfo extends Component {

    render() {
        let grayCircleSrc = "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"
        let heart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_regular.svg"
        let chat = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Chat/SVG/ic_fluent_chat_16_regular.svg"
        var applicant = this.props.data[this.props.ID]
        console.log(this.props.ID)
        return (
            <div id="applicant-info-item">
                <img id="applicant-image" src={grayCircleSrc} alt="Applicant icon" />
                <div id="applicant-name">
                    <span>{applicant.firstName} {applicant.lastName}</span>
                </div>
                <div id="applicant-info">
                    <img id="heart-image" src={heart} alt="Heart icon" />
                    <span>{applicant.likes} likes</span>
                    <img id="chat-image" src={chat} alt="Chat icon" />
                    <span>{applicant.comments} comments</span>
                </div>
            </div>
        )
    }
}

export default ApplicantInfo