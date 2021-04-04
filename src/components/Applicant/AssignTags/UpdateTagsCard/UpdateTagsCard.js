import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import UpdateTagInfo from "./UpdateTagInfo/UpdateTagInfo.js";

import "./UpdateTagsCard.css";

const TagsMapping = ({ applicantTags, allTags }) => {
    // https://github.com/microsoft/fluentui-system-icons/tree/master/assets/Dismiss/SVG
    const dismissImage = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Dismiss/SVG/ic_fluent_dismiss_12_regular.svg";

    return (
        applicantTags.map((tagId, index) => (
            <div id="individual-tag-badge" key={index}>
                <Badge type="info">
                    {allTags[tagId].text}
                    <button id="delete-tag-x-button">
                        <img id="delete-tag-x-icon" src={dismissImage} alt="Dismiss icon" />
                    </button>
                </Badge>
            </div>
        ))
    )
}

const AllTagsList = ({ allTags, toggleEditTag, showEditTagCard, editTagId }) => {
    const moreFilled = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/More%20Horizontal/SVG/ic_fluent_more_horizontal_16_filled.svg";

    return (
        Object.entries(allTags).map(([tagId, tagData]) => (
            <div id="tags-list-item">
                <button
                    id="edit-tag-button"
                    onClick={event => toggleEditTag(tagId)}
                >
                    <img id="update-tags-more-icon" src={moreFilled} alt="More icon" />
                </button>
                <div id="individual-tag-badge" key={tagId}>
                    {/* <Badge type={tagData.color}> */}
                    <Badge type="info">{allTags[tagId].text}</Badge>
                </div>
                {
                    showEditTagCard && editTagId === tagId ?
                        <UpdateTagInfo
                            editTagId={tagId}
                        /> : null
                }
            </div>
        ))
    )
}

class UpdateTagsCard extends Component {
    constructor() {
        super();
        this.state = {
            showEditTagCard: false,
            editTagId: null
        };
    }

    // Unique fxn courtesy of `react-onclickoutside`
    handleClickOutside = (event) => {
        event.stopPropagation();
        this.setState({
            showEditTagCard: false,
            editTagId: null
        });
    }

    toggleEditTag = (tagId) => {
        // If clicking same tag, toggle it open/close
        tagId === this.state.editTagId ? (
            this.setState({
                showEditTagCard: !this.state.showEditTagCard,
                editTagId: tagId
            })
        ) :
            // If clicking different tag, open only
            (
                this.setState({
                    showEditTagCard: true,
                    editTagId: tagId
                })
            )
    }

    render() {
        return (
            <div id="update-tags-container">
                <div id="update-tags-card">
                    <div id="applicant-current-tags-item">
                        Tags
                        <TagsMapping
                            applicantTags={this.props.applicantTags}
                            allTags={this.props.allTags}
                        />
                    </div>
                    <div id="all-tags-list-item">
                        <div id="select-option-text">
                            Select an option or create one
                        </div>
                        <AllTagsList
                            allTags={this.props.allTags}
                            toggleEditTag={this.toggleEditTag}
                            showEditTagCard={this.state.showEditTagCard}
                            editTagId={this.state.editTagId}
                        />
                    </div>
                    <div id="create-new-tag-item">
                        New Tag
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateTagsCard;