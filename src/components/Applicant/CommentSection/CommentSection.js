import React, { Component } from "react";
import "./CommentSection.css"

import Comment from "./Comment.js"
import noCommentsImage from "./no-comments.png"

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
            <div id="no-comments-container"> 
                <img className="no-comments-image" src={noCommentsImage} alt="No Comments default image" />
                <span id="no-comments-text">No one has comment yet. Be the first!</span>
            </div>
        )
    }
}

export default CommentSection