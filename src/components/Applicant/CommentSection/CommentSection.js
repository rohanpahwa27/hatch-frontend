import React, { useState } from "react";
import "./CommentSection.css"

import Comment from "./Comment.js"
import noCommentsImage from "./no-comments.png"
import api from "../../../Api/api";
import Loading from "@kiwicom/orbit-components/lib/Loading";

export default function CommentSection (props) {
    const [hoveredComment, setHover] = useState(null);
    const toggleHover = (commentId) => {
        setHover(commentId);
    }

    const deleteComment = async (applicantId, commentId) => {
        props.handleDelete(commentId);
        await api.deleteComment(applicantId, commentId);
    }

    const commentComponents = props.comments.map(comments => {
        const comment = <Comment 
            key={comments._id}
            applicantId={props.applicant.id}
            currMember={props.member}
            likes={comments.likes}
            commenterId={comments.member}
            commenterName={comments.name}
            comment={comments.text}
            commentId={comments._id} 
            date={comments.date ? comments.date : ""}
            profile={comments.imageSrc ? comments.imageSrc : "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"}
            likedComment={comments.likes.includes(props.member)}
            hoveredCommentId={hoveredComment}
            handleHover={toggleHover}
            handleDelete={deleteComment}
            />
        return comment
    })

    return (
        (!props.isLoading) ? 
            (props.comments.length >= 1) ?
                <div id="comment-section-grid-container">
                    {commentComponents}
                </div>
            : <div id="no-comments-container"> 
                <img className="no-comments" src={noCommentsImage} alt="No Comments default" />
                <span id="no-comments-text">No one has commented yet. Be the first!</span>
            </div>
        : 
        (props.isLessThan) ? null : <div><Loading/></div> // TODO: Change to something more aesthetic
    );
}