import React, { Component } from "react";
import "./ApplicantComment.css"
import OtherComment from "./OtherComment.js"

class ApplicantComment extends Component {
    render() {
        // TODO: Add check for which user this is to determine what type of comment it is
        // Later, add sort here
        const commentComponents = this.props.data.map((comments, index) => {
            return (
                <OtherComment key={index} 
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