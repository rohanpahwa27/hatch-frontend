import React from "react"
import "./Comment.css"
import CommentSection from "./CommentSection"

export default function Comment(props) {
    const trash = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Delete/SVG/ic_fluent_delete_16_regular.svg"
    const liked = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_filled.svg"
    const notLiked = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_regular.svg"  
    
    const hoverOn = () => props.handleHover(props.commentId);
    const hoverOff = () => props.handleHover(null);

    const deleteComment  = () => {
        props.handleDelete(props.applicantId, props.commentId);
    }
    
    const toggleCommentLike = () => {
        props.handleLike(props.applicantId, props.commentId);
    }

    return (
        // (props.currMemberName != "") ?
            <div id="comments-grid-container" onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
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
                                {props.likedComment ? <img id="comment-heart-image" src={liked} alt="Filled heart icon" onClick={toggleCommentLike}/> :
                                    <img id="comment-heart-image" src={notLiked} alt="Empty heart icon" onClick={toggleCommentLike}/>}
                                    <span className="comment-like">{props.numLikes}</span>
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
        // : <div id="loading-comment">Loading </div>
    );
}

// export default Comment
// class Comment extends Component {
//     constructor() {
//         super()
//         this.state = {
//             commenter: null,
//             likedComment: false,
//             liveLikeStatus: false,
//             numLikes: "",
//             isHovering: false
//         }
//     }

//     componentDidMount = async () => {
//         const commenterID = this.props.commenterID;
//         const memberResponse = await api.getMemberById(commenterID);
//         this.setState({
//             commenter: memberResponse.data.member,
//             likedComment: this.props.likes.includes(this.props.currMember) ^ this.state.liveLikeStatus            
//         });
//     }

//     handleLike = async () => {
//         this.setState({
//             liveLikeStatus: !this.state.liveLikeStatus
//         });
//         const commentId = this.props.commentId
//         const response = await api.changeApplicantCommentLike(this.props.applicantId, commentId);
//         this.componentDidMount();
//     }
    
//     deleteComment = async () => {
//         const applicantId = this.props.applicantId
//         const commentId = this.props.commentId
//         await api.deleteComment(applicantId, commentId)
//         this.props.handleDelete();
//     }

//     render() {
//         let filledHeart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_filled.svg"
//         let heart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_regular.svg"
//         let trash = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Delete/SVG/ic_fluent_delete_16_regular.svg"

//         const beforeCurrLikeStatus = this.props.likes.includes(this.props.currMember) ? this.props.likes.length - 1 : this.props.likes.length
//         const numLikes = this.state.likedComment ? beforeCurrLikeStatus + 1 : beforeCurrLikeStatus
//         return (
//             (this.state.commenter) ?
//             <div id="comments-grid-container" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
//                 <div id="comment-frame">
//                     <div id="image">
//                         <img className="comment-user-image" src={this.state.commenter.imageUrl ? this.state.commenter.imageUrl : grayCircleSrc} alt="Headshot" />
//                     </div>
//                     <div id="comment-information">
//                         <div id="comment-container">
//                             <span className="comment-name">{this.state.commenter.firstName} {this.state.commenter.lastName}</span>
//                             <span className="comment">{this.props.comment}</span>
//                         </div>
//                         <div id="comment-additional-info">
//                             <div id ="like">
//                                 {this.state.likedComment ? <img id="comment-heart-image" src={filledHeart} alt="Like icon" onClick={this.handleLike}/> :
//                                 <img id="comment-heart-image" src={heart} alt="Heart icon" onClick={this.handleLike}/>}
//                                 <span className="comment-like">{numLikes}</span>
//                             </div>
//                             <div id ="date">
//                                 <span className="comment-date">{this.props.date.substr(4, 6)}</span>
//                             </div>
//                         </div>
//                         {/* TODO, account for one line comments + comments that are more than 2 lines with see more */}
//                     </div>
//                 </div>
//                 <div id="comment-delete">
//                         {this.state.isHovering && this.props.commenterID == this.props.currMember &&
//                             <img id="comment-delete" onClick={this.deleteComment} src={trash} alt="Delete icon"/> 
//                         }
//                 </div>
//             </div> : null
//         )
//     }
// }

// export default Comment
