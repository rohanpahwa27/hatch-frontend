import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "@kiwicom/orbit-components/lib/Badge";

import "./UpdateTagsCard.css";

const TagsMapping = ({ applicantTags, allTags }) => (
    <>
        {applicantTags.map((tagId, index) => (
            <div id="individual-tag-badge" key={index}>
                <Badge type="info">{allTags[tagId].text}</Badge>
            </div>
        ))}
    </>
);

const AllTagsList = ({ allTags }) => {
    const moreFilled = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/More%20Horizontal/SVG/ic_fluent_more_horizontal_16_filled.svg";
    // const [showEditTagCard, toggleEditTag] = useState(false);

    return (
        Object.entries(allTags).map(([tagId, tagData]) => (
            <div id="tags-list-item">
                <button
                    id="edit-tag-button"
                    onClick={toggleEditTag(true)}
                >
                    <img id="update-tags-more-icon" src={moreFilled} alt="More icon" />
                </button>
                <div id="individual-tag-badge" key={tagId}>
                    <Badge type="info">{allTags[tagId].text}</Badge>
                </div>
                {
                    showEditTagCard ?
                        <div>showing card!</div> : null
                }
            </div>
        ))
    )
}

class UpdateTagsCard extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         showEditTagCard: true
    //     };
    // }

    // // Unique fxn courtesy of `react-onclickoutside`
    // handleClickOutside = (event) => {
    //     event.stopPropagation();
    //     this.setState({
    //         showEditTagCard: false
    //     });
    // }

    // toggleEditTag = () => {
    //     this.setState({
    //         showEditTagCard: !this.state.showEditTagCard
    //     });
    // }

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
                        Select an option or create one
                        <AllTagsList 
                        allTags={this.props.allTags} 
                        toggleEditTag={this.toggleEditTag}
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