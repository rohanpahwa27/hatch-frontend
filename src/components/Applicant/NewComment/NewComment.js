import React, { Component } from "react"
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import api from "../../../Api/api"

import "./NewComment.css"

class NewComment extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            comment: "",
        }
    }

    sendComment = async () => {
        const applicantId = this.props.applicant._id
        const response = await api.uploadApplicantComment(applicantId, this.state.comment);
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
                        <InputField type="text" placeholder="type your comment here" value={this.state.comment} onChange={this.handleChange}/>
                    </div>
                    <div id="new-comment-send">
                        <Button submit={true} fullWidth={false} type={"secondary"} onClick={this.sendComment}>Send</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewComment