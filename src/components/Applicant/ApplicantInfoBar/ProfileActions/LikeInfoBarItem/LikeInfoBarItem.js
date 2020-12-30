import React, { Component } from "react"
import "./LikeInfoBarItem.css"

class LikeInfoBarItem extends Component {
    render() {
        let heart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_regular.svg"
        return (
            <div id="like-info-bar-item">
                <img id="like-image" src={heart} alt="Like icon" />
                <span>Like</span>
            </div>
        )
    }
}

export default LikeInfoBarItem