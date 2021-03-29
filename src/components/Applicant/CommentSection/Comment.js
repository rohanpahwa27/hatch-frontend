import React, { useState } from "react"
import "./Comment.css"

import api from "../../../Api/api";

export default function Comment(props) {
    const trash = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Delete/SVG/ic_fluent_delete_16_regular.svg"
    const liked = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_filled.svg"
    const notLiked = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_regular.svg"  
    
    const hoverOn = () => {
        props.handleHover(props.commentId);
    }
    const hoverOff = () => props.handleHover(null);

    const deleteComment  = () => {
        props.handleDelete(props.applicantId, props.commentId);
    }

    const [commentLiked, setLike] = useState(props.likedComment);
    const toggleLike = async () => {
        await api.changeApplicantCommentLike(props.applicantId, props.commentId);
        // backwards logic because commentLiked is not accurate but did it before setLike because setLike is not instant
        if (props.likedComment) {
            setLikes(props.likes.length - 1 + ((commentLiked) ? 0 : 1))
        } else {
            setLikes(props.likes.length + ((commentLiked) ? 0 : 1))
        }
        setLike(!commentLiked)
    }
  
    const [numLikes, setLikes] = useState(props.likes.length);

    return (
            <div id="comments-grid-container" onMouseOver={hoverOn} onMouseLeave={hoverOff}>
                <div id="comment-frame">
                    <div id="image">
                        <img className="comment-user-image" src={props.profile} alt="Headshot" />
                    </div>
                    <div id="comment-information">
                        <div id="comment-container">
                            <span className="comment-name">{props.commenterName}</span>
                            <span className="comment">{props.comment}</span>
                        </div>
                        <div id="comment-additional-info">
                            <div id ="like">
                                {commentLiked ? <img id="comment-heart-image" src={liked} alt="Filled heart icon" onClick={toggleLike}/> :
                                    <img id="comment-heart-image" src={notLiked} alt="Empty heart icon" onClick={toggleLike}/>}
                                    <span className="comment-like">{numLikes}</span>
                                </div>
                            <div id ="date">
                                <span className="comment-date">{props.date.substr(4, 6)}</span>
                            </div>
                        </div>
                        {/* TODO, account for one line comments + comments that are more than 2 lines with see more */}
                    </div>
                </div>
                <div id="comment-delete">
                        {props.hoveredCommentId == props.commentId && props.commenterId == props.currMember &&
                            <img id="comment-delete" src={trash} alt="Delete icon" onClick={deleteComment}/> 
                        }
                </div>
            </div> 
    );
}