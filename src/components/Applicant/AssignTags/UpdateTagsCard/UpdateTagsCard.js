import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import UpdateTagInfo from "./UpdateTagInfo/UpdateTagInfo.js";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";

import "./UpdateTagsCard.css";

const TagsMapping = ({ applicantTags, allTags, handleRemoveTagApplicant }) => {
    const dismissImage = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Dismiss/SVG/ic_fluent_dismiss_12_regular.svg";

    return (
        applicantTags.map((tagId, index) => (
            <div id="individual-tag-badge" key={index}>
                <Badge type={allTags[tagId].color}>
                    {allTags[tagId].text}
                    <button
                        id="delete-tag-x-button"
                        onClick={event => handleRemoveTagApplicant(tagId)}
                    >
                        <img id="delete-tag-x-icon" src={dismissImage} alt="Dismiss icon" />
                    </button>
                </Badge>
            </div>
        ))
    )
}

const AllTagsList = ({ allTags, toggleEditTag, showEditTagCard, editTagId, handleAddTagApplicant, handleUpdateTag, handleDeleteTag }) => {
    const moreFilled = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/More%20Horizontal/SVG/ic_fluent_more_horizontal_16_filled.svg";

    return (
        Object.entries(allTags).map(([tagId, tagData]) => (
            // console.log(tagId, tagData),
            <div id="tags-list-item">
                <button
                    id="edit-tag-button"
                    onClick={event => toggleEditTag(tagId)}
                >
                    <img id="update-tags-more-icon" src={moreFilled} alt="More icon" />
                </button>
                <div id="individual-tag-badge" key={tagId}
                    onClick={event => handleAddTagApplicant(tagId)}
                >
                    <Badge type={tagData.color}>{allTags[tagId].text}</Badge>
                </div>
                {
                    showEditTagCard && editTagId === tagId ?
                        <UpdateTagInfo
                            id={tagId}
                            color={tagData.color}
                            text={tagData.text}
                            toggleEditTag={toggleEditTag}
                            handleUpdateTag={handleUpdateTag}
                            handleDeleteTag={handleDeleteTag}
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
            editTagId: null,
            text: ""
        };
    }

    // Unique fxn courtesy of `react-onclickoutside`
    handleClickOutside = (event) => {
        event.stopPropagation();
        this.props.toggleShowTags();
    }

    toggleEditTag = (tagId) => {
        console.log(tagId)
        tagId === this.state.editTagId ? (
            // If clicking same tag, toggle it open/close
            this.setState({
                showEditTagCard: !this.state.showEditTagCard,
                editTagId: tagId
            })
        ) : (
            // If clicking different tag, open only
            this.setState({
                showEditTagCard: true,
                editTagId: tagId
            })
        )
    }

    changeTagText = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    createTag = (text) => {
        const { handleCreateTag } = this.props.handleTagCRUD;
        handleCreateTag("critical", text);
        this.setState({
            text: ""
        });
    }

    render() {
        const { handleAddTagApplicant, handleRemoveTagApplicant } = this.props.handleTagApplicant;
        const { handleCreateTag, handleUpdateTag, handleDeleteTag } = this.props.handleTagCRUD;

        return (
            <div id="update-tags-container">
                <div id="update-tags-card">
                    <div id="current-tags-item">
                        Tags
                        <TagsMapping
                            applicantTags={this.props.applicantTags}
                            allTags={this.props.allTags}
                            handleRemoveTagApplicant={handleRemoveTagApplicant}
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
                            handleAddTagApplicant={handleAddTagApplicant}
                            handleUpdateTag={handleUpdateTag}
                            handleDeleteTag={handleDeleteTag}
                        />
                    </div>
                    <div id="create-new-tag-item">
                        {/* New Tag&nbsp; */}
                        <InputField
                            id="new-tag-input-item"
                            type="text"
                            placeholder="Name your tag here"
                            label="New tag"
                            inlineLabel={true}
                            value={this.state.text}
                            minLength={3}
                            maxLength={30}
                            onChange={this.changeTagText}
                        />
                        <Button
                            fullWidth={true}
                            type={"secondary"}
                            disabled={this.state.text === null || this.state.text.length < 3}
                            onClick={event => this.createTag(this.state.text)}
                        >
                            Done
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default onClickOutside(UpdateTagsCard, { excludeScrollbar: true });