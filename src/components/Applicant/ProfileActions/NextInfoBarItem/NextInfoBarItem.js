import React, { Component } from "react"
import "./NextInfoBarItem.css"

class NextInfoBarItem extends Component {
    render() {
        let next = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Arrow%20Right/SVG/ic_fluent_arrow_right_16_regular.svg"
        return (
            <div id="next-info-bar-item" onClick={this.props.handleNext}>
                <img id="applicant-action-next-image" src={next} alt="Next icon" />
                <span id="applicant-action-next-text">Next applicant</span>
            </div>
        )
    }
}

export default NextInfoBarItem