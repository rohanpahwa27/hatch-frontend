import React, { Component } from "react"
import "./TableRow.css"
import likesImage from "./Icons/heart.png"
import commentsImage from "./Icons/comment.png"

class TableRow extends Component {
    render() {
        const components = []

        const name = (
            <td className="name-div table-data-cell" key="name">
                <img className="applicant-image" src={this.props.imageUrl} alt="Headshot" />
                <span className="applicant-name">{this.props.firstName} {this.props.lastName}</span>
            </td>
        )

        const likes = (
            <td className="table-data-cell" key="likes">
                <img className="heart-icon" src={likesImage} alt="Heart icon" />
                <span>{this.props.likes}</span>
            </td>
        )

        const comments = (
            <td className="table-data-cell" key="comments">
                <img className="comment-icon" src={commentsImage} alt="Comments icon" />
                <span>{this.props.comments}</span>
            </td>
        )

        components.push(name)
        components.push(likes)
        components.push(comments)

        return (
            <tr id="table-row-grid-container" onClick={event => this.props.handleClick(event, this.props.appID)}>
                {components}
            </tr>
        )
    }
}

export default TableRow
