import React, { Component } from "react";
import "./ApplicantComment.css"
import Comment from "./Comment.js"

class ApplicantComment extends Component {
    render() {
        // TODO: add sort here
        const commentComponents = this.props.comments.map((comments, index) => {
            return (
                <Comment key={index}
                            likes={comments.likes}
                            commenterID={comments.member}
                            comment={comments.text} />
            )
        })

        return ( (this.props.comments.length >= 1) ?
            <tbody id="applicant-comments-grid-container">
                {commentComponents}
            </tbody> : 
            // TODO: Make this look prettier
            <tbody id="no-comments"> No comments yet</tbody>
        )
    }
}

export default ApplicantComment