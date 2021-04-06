import React, { Component } from "react";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import UpdateTagsCard from "./UpdateTagsCard/UpdateTagsCard.js";

import "./AssignTags.css";

const TagsMapping = ({ applicantTags, allTags }) => {
    return (
        applicantTags.map((tagId, index) => (
            <div id="individual-tag-badge" key={index}>
                <Badge type={allTags[tagId].color}>
                    {allTags[tagId].text}
                </Badge>
            </div>
        ))
    )
}

class AssignTags extends Component {
    constructor() {
        super();
        this.state = {
            showTagsCard: true
        };
    }

    toggleShowTags = () => {
        this.setState({
            showTagsCard: !this.state.showTagsCard
        });
    }

    render() {
        const addImage = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Add/SVG/ic_fluent_add_12_regular.svg";

        return (
            <div id="applicant-assign-tags-container">
                <div id="applicant-assign-tags-item">
                    Tags
                    <TagsMapping
                        applicantTags={this.props.applicant.tags}
                        allTags={this.props.allTags}
                    />
                    <button
                        id="applicant-assign-tags-button"
                        onClick={this.toggleShowTags}
                    >
                        <img id="applicant-assign-tags-add-icon" src={addImage} alt="Add icon" />
                    </button>
                    {
                        this.state.showTagsCard ?
                            <UpdateTagsCard
                                applicantTags={this.props.applicant.tags}
                                allTags={this.props.allTags}
                                toggleShowTags={this.toggleShowTags}
                                handleTagCRUD={this.props.handleTagCRUD}
                                handleTagApplicant={this.props.handleTagApplicant}
                            /> : null
                    }
                </div>
            </div>
        )
    }
}

export default AssignTags;