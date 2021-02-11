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
            <tbody id="new-comment">
                <div id="text-box">
                    <InputField type="text" placeholder="type your comment here" value={this.state.comment} onChange={this.handleChange}/>
                </div>
                <div id="send">
                    <Button submit={true} fullWidth={false} type={"secondary"} onClick={this.sendComment}>Send</Button>
                </div>
            </tbody>
        )
    }
}

export default NewComment