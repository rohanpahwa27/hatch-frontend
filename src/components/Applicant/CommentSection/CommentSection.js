import React, { Component } from "react";
import "./CommentSection.css"

import Comment from "./Comment.js"

class CommentSection extends Component {
    render() {
        const commentComponents = this.props.comments.map((comments, index) => {
            return (
                <Comment key={index}
                            likes={comments.likes}
                            commenterID={comments.member}
                            comment={comments.text} />
            )
        })

        return ( (this.props.comments.length >= 1) ?
            <div id="comment-section-grid-container">
                {commentComponents}
            </div> : 
            <div id="no-comments"> No comments yet</div>
        )
    }
}

export default CommentSection