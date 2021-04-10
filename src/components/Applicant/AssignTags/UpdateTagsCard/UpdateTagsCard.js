import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import UpdateTagInfo from "./UpdateTagInfo/UpdateTagInfo.js";
import InputField from "@kiwicom/orbit-components/lib/InputField";

import "./UpdateTagsCard.css";

const TagsMapping = ({ applicantTags, allTags, handleRemoveTagApplicant }) => {
    const dismissImage = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Dismiss/SVG/ic_fluent_dismiss_12_regular.svg";

    return (
        applicantTags.map((tagId, index) => {
            return (tagId in allTags ?
                <div id="individual-tag-badge" key={index}>
                    <Badge type={allTags[tagId].color}>
                        <div id="individual-tag-text">
                            {allTags[tagId].text}
                            <button
                                id="delete-tag-x-button"
                                onClick={event => handleRemoveTagApplicant(tagId)}
                            >
                                <img id="delete-tag-x-icon" src={dismissImage} alt="Dismiss icon" />
                            </button>
                        </div>
                    </Badge>
                </div> : null
            )
        })
    )
}

const AllTagsList = ({ allTags, toggleEditTag, showEditTagCard, editTagId, handleAddTagApplicant, handleUpdateTag, handleDeleteTag }) => {
    const moreFilled = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/More%20Horizontal/SVG/ic_fluent_more_horizontal_16_filled.svg";

    return (
        Object.entries(allTags).map(([tagId, tagData]) => (
            <div id="tags-list-item">
                <button
                    id="edit-tag-button"
                    className="ignore-react-onclickoutside"
                    onClick={event => toggleEditTag(tagId)}
                >
                    <img id="update-tags-more-icon" src={moreFilled} alt="More icon" />
                </button>
                <div
                    id="add-tag-div-item"
                    onClick={event => handleAddTagApplicant(tagId)}
                >
                    <div id="individual-tag-badge-tags-list" key={tagId}>
                        <Badge type={tagData.color}>
                            <div id="individual-tag-text">
                                {allTags[tagId].text}
                            </div>
                        </Badge>
                    </div>
                    <div style={{ flexGrow: 1 }}></div>
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
            text: "",
            disableSubmit: true
        };
    }

    // Unique fxn courtesy of `react-onclickoutside`
    handleClickOutside = (event) => {
        event.stopPropagation();
        this.props.toggleShowTags();
    }

    toggleEditTag = (tagId) => {
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
            text: event.target.value,
            disableSubmit: event.target.value.length < 3
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
                        <button
                            id="update-tag-done-button"
                            style={{
                                opacity: (this.state.disableSubmit) ? 0.3 : 1,
                                cursor: (this.state.disableSubmit) ? "not-allowed" : "pointer"
                            }}
                            disabled={this.state.disableSubmit}
                            onClick={event => this.createTag(this.state.text)}
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default onClickOutside(UpdateTagsCard, { excludeScrollbar: true });