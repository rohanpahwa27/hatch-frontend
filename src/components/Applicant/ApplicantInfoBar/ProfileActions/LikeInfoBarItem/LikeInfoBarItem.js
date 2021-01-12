import React, { Component } from "react"
import "./LikeInfoBarItem.css"
import api from "../../../../../Api/api"

class LikeInfoBarItem extends Component {
    constructor() {
        super()
        this.state = {
            likedApplicant: false
        }
    }
    componentDidMount = async () => {
        // try {
        //     const likeResponse = await api.didUserLikeMember(this.props.applicantID);
        //     this.setState({likedApplicant: likeResponse.data.like})
        // } catch (error) {
            
        // }
    }
    render() {
        const imageClick = async () => {
            this.setState({likedApplicant: !this.state.likedApplicant})
            console.log('changing like');
            // const response = api.changeUserLikeMember(this.props.applicantID);
            // this.setState({likedApplicant: response.data.like})
        } 
        let heart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_regular.svg"
        let filledHeart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_filled.svg"
        return (
            <div id="like-info-bar-item">
                {this.state.likedApplicant ? <img id="like-image" src={filledHeart} onClick={() => imageClick()}/> :
                <img id="like-image" src={heart} alt="Like icon" onClick={() => imageClick()}/>}
                <span>Like</span>
            </div>
        )
    }
}

export default LikeInfoBarItem