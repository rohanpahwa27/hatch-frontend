import React, { Component } from "react";
import "./CommentSection.css"

import Comment from "./Comment.js"
import noCommentsImage from "./no-comments.png"
import Loading from "@kiwicom/orbit-components/lib/Loading";

class CommentSection extends Component {
    // test = async () => {
    //     const commentComponents = this.props.comments.map((comments, index) => {
    //         const comment = <Comment 
    //             key={index}
    //             applicantId={this.props.applicant._id}
    //             likes={comments.likes}
    //             commenterID={comments.member}
    //             comment={comments.text}
    //             commentId={comments._id} />
    //         return comment
    //     })
    //     return commentComponents
    // }

    render() {
        const commentComponents = this.props.comments.map((comments, index) => {
            const comment = <Comment 
                key={comments._id}
                applicantId={this.props.applicant.id}
                currMember={this.props.member}
                likes={comments.likes}
                commenterID={comments.member}
                comment={comments.text}
                commentId={comments._id} 
                date={comments.date ? comments.date : ""}
                handleDelete={this.props.handleDelete}/>
            return comment
        })

        // TODO: Load comments all at once
        return ( 
        (this.props.comments.length >= 1) ?
            (commentComponents) ?
                <div id="comment-section-grid-container">
                    {commentComponents}
                </div>  : <div id="loading-screen"><Loading/></div>
            : <div id="no-comments-container"> 
                <img className="no-comments" src={noCommentsImage} alt="No Comments default" />
                <span id="no-comments-text">No one has commented yet. Be the first!</span>
            </div>
        )
    }
}

export default CommentSection