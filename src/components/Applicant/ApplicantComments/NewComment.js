import React, { Component } from "react"
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";

import "./NewComment.css"

class NewComment extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            comment: null,
        }
    }

    sendComment = async (event) => {
        const formData = new FormData();
        const orgId = localStorage.getItem("orgID");
        formData.append("data", this.state.comment);
        formData.append("orgID", orgId ? orgId : '5fcebc5bdc4d7b32372834c5');
        //TODO: pass information through pages and programatically input orgID instead of hardcoding it above
        // const response = await api.uploadApplicantPhoto(formData);
        // TODO: use shorthand for api call
        // console.log(response);
    };

    render() {
        return (
            <div id="new-comment">
                <div id="text-box">
                    <InputField type="text" placeholder="type your comment here"/> 
                    {/* //value={this.props.comment} onChange={this.props.handleCommentChange} /> */}
                </div>
                <div id="send">
                    <Button submit={true} fullWidth={false} type={"secondary"} onClick={this.sendComment}>Send</Button>
                </div>
            </div>
        )
    }
}

export default NewComment