import React, { Component } from "react"
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";

import "./NewComment.css"

class NewComment extends Component {
    render() {
        return (
            <div id="new-comment">
                <div id="text-box">
                    <InputField type="text" placeholder="type your comment here"/> 
                    {/* TODO: Connect to database */}
                    {/* //value={this.props.comment} onChange={this.props.handleCommentChange} /> */}
                </div>
                <div id="send">
                    <Button submit={true} fullWidth={false} type={"secondary"}>Send</Button>
                </div>
            </div>
        )
    }
}

export default NewComment