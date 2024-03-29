import React, { Component } from "react"
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import api from "../../../Api/api"
import ChevronRight from "@kiwicom/orbit-components/lib/icons/ChevronRight";

import "./NewComment.css"

class NewComment extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            comment: "",
            reload: false
        }
    }

    sendComment = async () => {
        const applicantId = this.props.applicantID
        const text = this.state.comment
        const date = new Date().toString();
        await api.addComment(applicantId, {text, date})
        this.setState({
            comment: ""
        });
        this.props.handleNewComment()
    };

    handleChange = e => {
        this.setState({
             comment: e.target.value
        });
    }

    render() {
        return (
            <div id="new-comment-bar">
                <div id="new-comment-container">
                    <div id="new-comment-text-box">
                        <InputField 
                        id="new-comment-text-box-item"
                        type="text" placeholder="type your comment here" value={this.state.comment} onChange={this.handleChange}/>
                    </div>
                    <div id="new-comment-send">
                        <Button submit={true} fullWidth={false} type={"secondary"} onClick={this.sendComment} iconLeft={<ChevronRight />}></Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewComment