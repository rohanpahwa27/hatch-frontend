import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import UpdateTagsCard from "./UpdateTagsCard/UpdateTagsCard.js";

import "./AssignTags.css";

const TagsMapping = ({ applicantTags, allTags }) => {
    return (
        applicantTags.map((tagId, index) => (
            console.log(allTags, tagId),
            <div id="individual-tag-badge" key={index}>
                <Badge type="info">
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

    // Unique fxn courtesy of `react-onclickoutside`
    handleClickOutside = (event) => {
        event.stopPropagation();
        this.setState({
            showTagsCard: false
        });
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
                <div id="applicant-current-tags-item">
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
                                handleUpdateTag={this.props.handleUpdateTag}
                            /> : null
                    }
                </div>
            </div>
        )
    }
}

export default onClickOutside(AssignTags);