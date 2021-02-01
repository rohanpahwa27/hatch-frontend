import React, { Component } from "react"
import likesImage from "./heart.png"
import "./Comment.css"
import api from "../../../Api/api"

class Comment extends Component {
    constructor() {
        super()
        this.state = {
            commenter: null
        }
    }

    componentDidMount = async () => {
        try {
            const commenterID = this.props.commenterID;
            const memberResponse = await api.getMemberById(commenterID);
            this.setState({
                commenter: memberResponse.data.member,
            })
        } catch (error) {
            
        }
    }

    render() {
        let grayCircleSrc = "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"
        const components = []
        if (this.state.commenter) {
            const image = (
                <td className="image" key={this.state.commenter.imageUrl}>
                    <img className="comment-user-image" src={this.state.commenter.imageUrl ? this.state.commenter.imageUrl : grayCircleSrc} alt="Headshot" />
                </td>
            )

            const name = (
                <td className="applicant-name-div" key={this.props.commenterID}>
                    <span className="comment-name">{this.state.commenter.firstName} {this.state.commenter.lastName}</span>
                    <span className="comment">{this.props.comment}</span>
                    {/* TODO, account for one line comments + comments that are more than 2 lines with see more */}
                </td>
            )

            const likes = (
                <td className ="like" key={this.props.likes.length}>
                    <img className="heart-image" src={likesImage} alt="Heart icon" />
                    <span className="comment-like">{this.props.likes.length}</span>
                </td>
            )

            // const date = (
            //     <td className ="date">
            //         {/* <span className="comment-date">{this.props.date}</span> */}
            //     </td>
            // )

            components.push(image)
            components.push(name)
            components.push(likes)
            // components.push(date)
        }

        return (
            (this.state.commenter) ?
            <tr id="comments-grid-container">
                {components}
            </tr> : null
        )
    }
}

export default Comment
