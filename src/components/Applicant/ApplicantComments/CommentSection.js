import React, { Component } from "react";
import "./CommentSection.css"

import ApplicantComment from "./ApplicantComment.js"
import NewComment from "./NewComment.js"

class CommentSection extends Component {
    render() {
        return (
            <table id="comment-section-grid-container">
                <ApplicantComment comments={this.props.comments} />
                {/* <NewComment /> */}
            </table>
        )
    }
}

export default CommentSection