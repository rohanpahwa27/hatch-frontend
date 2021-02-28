import React, { Component } from "react"
import "./LikeInfoBarItem.css"

class LikeInfoBarItem extends Component {
    render() {
        let heart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_regular.svg"
        let filledHeart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_filled.svg"
        return (
            <div id="like-info-bar-item" onClick={this.props.handleLike}>
                {this.props.likedApplicant ? <img id="applicant-action-like-image" src={filledHeart} alt="Like icon"/> :
                <img id="applicant-action-like-image" src={heart} alt="Like icon"/>}
                <span id="applicant-action-like-text">Like</span>
            </div>
        )
    }
}

export default LikeInfoBarItem