import React, { Component } from "react"
import "./Comment.css"
import api from "../../../Api/api"

class Comment extends Component {
    constructor() {
        super()
        this.state = {
            commenter: null,
            likedComment: false,
            numLikes: "",
            hidden: false,
            deleted: false,
            isHovering: false
        }
    }

    componentDidMount = async () => {
        try {
            if (!this.state.hidden) {
                const commenterID = this.props.commenterID;
                const memberResponse = await api.getMemberById(commenterID);
                this.setState({
                    commenter: memberResponse.data.member,
                    likedComment: this.props.likes.includes(this.props.member) ^ this.state.likedComment            
                });
            }
        } catch (error) {
            
        }
    }

    handleLike = async () => {
        this.setState({
            likedComment: !this.state.likedComment
        });
        const commentId = this.props.commentId
        const response = await api.changeApplicantCommentLike(this.props.applicantId, {commentId});
        console.log(response)
        this.componentDidMount();
    }
    
    deleteComment = async () => {
        this.setState({
            hidden: true
        });
        this.componentDidMount();
        const applicantId = this.props.applicantId
        const commentId = this.props.commentId
        await api.deleteComment(applicantId, commentId)
        this.setState({
            deleted: true
        });
        this.componentDidMount();
        this.props.handleDelete();
    }

    handleMouseEnter = () => {
        this.setState({isHovering: true});
    }

    handleMouseLeave = () => {
        this.setState({isHovering: false});
    }

    render() {
        let grayCircleSrc = "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"
        let filledHeart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_filled.svg"
        let heart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_regular.svg"
        let trash = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Delete/SVG/ic_fluent_delete_16_regular.svg"

        const beforeCurrLikeStatus = this.props.likes.includes(this.props.member) ? this.props.likes.length - 1 : this.props.likes.length
        const numLikes = this.state.likedComment ? beforeCurrLikeStatus + 1 : beforeCurrLikeStatus
        return (
            (this.state.commenter && !this.state.deleted && !this.state.hidden) ?
            <div id="comments-grid-container" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div id="comment-frame">
                    <div id="image">
                        <img className="comment-user-image" src={this.state.commenter.imageUrl ? this.state.commenter.imageUrl : grayCircleSrc} alt="Headshot" />
                    </div>
                    <div id="comment-information">
                        <div id="comment-container">
                            <span className="comment-name">{this.state.commenter.firstName} {this.state.commenter.lastName}</span>
                            <span className="comment">{this.props.comment}</span>
                        </div>
                        <div id="comment-additional-info">
                            <div id ="like">
                                {this.state.likedComment ? <img id="comment-heart-image" src={filledHeart} alt="Like icon" onClick={this.handleLike}/> :
                                <img id="comment-heart-image" src={heart} alt="Heart icon" onClick={this.handleLike}/>}
                                <span className="comment-like">{numLikes}</span>
                            </div>
                            <div id ="date">
                                <span className="comment-date">{this.props.date.substr(4, 6)}</span>
                            </div>
                        </div>
                        {/* TODO, account for one line comments + comments that are more than 2 lines with see more */}
                    </div>
                    <div id="comment-delete">
                        {this.state.isHovering &&
                            <img id="comment-delete" onClick={this.deleteComment} src={trash} alt="Delete icon"/> 
                        }
                    </div>
                </div>
            </div> : null
        )
    }
}

export default Comment
