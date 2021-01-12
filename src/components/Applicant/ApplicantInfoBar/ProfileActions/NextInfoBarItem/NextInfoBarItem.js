import React, { Component } from "react"
import "./NextInfoBarItem.css"

class NextInfoBarItem extends Component {
    render() {
        let next = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Arrow%20Right/SVG/ic_fluent_arrow_right_16_regular.svg"
        // TODO: send numApplicants for this
        // TODO: how do we want to determine order for next?? handling inactive applicants + prob want an array sent down of valid memberIDs?
        let nextID = this.props.ID + 1 <= 13 ? this.props.ID + 1 : 0
        return (
            <div id="next-info-bar-item" onClick={event => this.props.handleClick(event, nextID)}>
                <img id="next-image" src={next} alt="Next icon" />
                <span>Next applicant</span>
            </div>
        )
    }
}

export default NextInfoBarItem