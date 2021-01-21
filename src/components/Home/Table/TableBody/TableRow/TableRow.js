import React, { Component } from "react"
import "./TableRow.css"
import likesImage from "./Icons/heart.png"
import commentsImage from "./Icons/comment.png"

class TableRow extends Component {
    render() {
        const components = []

        const name = (
            <td className="name-div table-data-cell">
                <img className="applicant-image" src={this.props.imgURL} alt="Headshot" />
                <span className="applicant-name">{this.props.firstName} {this.props.lastName}</span>
            </td>
        )

        const likes = (
            <td className="table-data-cell">
                <img className="heart-icon" src={likesImage} alt="Heart icon" />
                <span>{this.props.likes}</span>
            </td>
        )

        const comments = (
            <td className="table-data-cell">
                <img className="comment-icon" src={commentsImage} alt="Comments icon" />
                <span>{this.props.comments}</span>
            </td>
        )

        const tags = (
            <td>
                <span>{this.props.tags}</span>
            </td>
        )

        components.push(name)
        components.push(likes)
        components.push(comments)
        components.push(tags)

        return (
            <tr id="table-row-grid-container" onClick={event => this.props.handleClick(event, this.props.id)}>
                {components}
            </tr>
        )
    }
}

export default TableRow
