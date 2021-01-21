import React, { Component } from "react";
import "./ApplicantComment.css"
import Comment from "./Comment.js"

class ApplicantComment extends Component {
    render() {
        // TODO: add sort here
        const commentComponents = this.props.data.map((comments, index) => {
            return (
                <Comment key={index} 
                          firstName={comments.firstName} 
                          lastName={comments.lastName} 
                          imgURL={comments.imgURL}
                          likes={comments.likes}
                          date={comments.date}
                          comment={comments.comment} />
            )
        })

        return (
            <tbody id="applicant-comments-grid-container">
                {commentComponents}
            </tbody>
        )
    }
}

export default ApplicantComment