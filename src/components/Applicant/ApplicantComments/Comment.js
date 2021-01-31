import React, { Component } from "react"
import likesImage from "./heart.png"
import "./Comment.css"

class OtherComment extends Component {
    render() {
        const components = []

        const image = (
            <td className="image">
                {/* <img className="comment-user-image" src={this.props.imgURL} alt="Headshot" /> */}
            </td>
        )

        const name = (
            <td className="applicant-name-div">
                <span className="comment-name">{this.props.firstName} {this.props.lastName}</span>
                <span className="comment">{this.props.comment}</span>
                {/* TODO, account for one line comments + comments that are more than 2 lines with see more */}
            </td>
        )

        const likes = (
            <td className ="like">
                {/* <img className="heart-image" src={likesImage} alt="Heart icon" /> */}
                {/* <span className="comment-like">{this.props.likes}</span> */}
            </td>
        )

        const date = (
            <td className ="date">
                {/* <span className="comment-date">{this.props.date}</span> */}
            </td>
        )

        components.push(image)
        components.push(name)
        components.push(likes)
        components.push(date)

        return (
            <tr id="comments-grid-container">
                {components}
            </tr>
        )
    }
}

export default OtherComment
