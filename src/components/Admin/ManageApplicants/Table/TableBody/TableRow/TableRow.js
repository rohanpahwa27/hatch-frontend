import React, { Component } from "react";
import "./TableRow.css";
import emptyHeart from "./Icons/emptyHeart.png";
import filledHeart from "./Icons/filledHeart.png";
import commentsImage from "./Icons/comment.png";
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox";
import Badge from "@kiwicom/orbit-components/lib/Badge";

const Check = ({ applicantId, handleSelected, isSelected }) => {
    let [checked] = React.useState(false);
    checked = isSelected(applicantId)
    return (
        <Checkbox
            checked={checked}
            onChange={() => {
                handleSelected(applicantId)
            }}
        />
    );
};

const TagsMapping = ({ applicantTags, allTags }) => {
    return (
        applicantTags.map((tagId, index) => {
            return (tagId in allTags ?
                <div id="individual-tag-badge" key={index}>
                    <Badge type={allTags[tagId].color}>
                        <div id="individual-tag-text">
                            {allTags[tagId].text}
                        </div>
                    </Badge>
                </div> : null
            )
        })
    );
};

class TableRow extends Component {
    render() {
        const components = [];

        const select = (
            <td className="manage-checkbox-div manage-table-data-cell">
                <span className="manage-row-item select-checkbox">
                    <Check
                        applicantId={this.props.applicantId}
                        handleSelected={this.props.handleSelected}
                        isSelected={this.props.isSelected}
                    />
                </span>
            </td>
        );

        const name = (
            <td className="manage-name-div manage-table-data-cell">
                <img className="manage-applicant-image" src={this.props.imageUrl} alt="Headshot" />
                <span className="manage-row-item manage-applicant-name">
                    {this.props.status === "Inactive" ? <Badge type="info">Withdrawn</Badge> : null}
                    &nbsp;{this.props.firstName} {this.props.lastName}
                    <TagsMapping
                        applicantTags={this.props.tags}
                        allTags={this.props.allTags}
                    />
                </span>
            </td>
        );

        const likes = (
            <td className="manage-table-data-cell">
                <img className="manage-heart-icon" src={emptyHeart} alt="Heart icon" />
                <span className="manage-row-item">{this.props.likes}</span>
            </td>
        );

        const comments = (
            <td className="manage-table-data-cell">
                <img className="manage-comment-icon" src={commentsImage} alt="Comments icon" />
                <span className="manage-row-item">{this.props.comments}</span>
            </td>
        );

        // const dateAdded = (
        //     <td className="manage-table-data-cell">
        //         <span className="manage-row-item">Feb 2, 2021</span>
        //     </td>
        // );

        // const dateModified = (
        //     <td className="manage-table-data-cell">
        //         <span className="manage-row-item">Feb 2, 2021</span>
        //     </td>
        // );

        components.push(select);
        components.push(name);
        components.push(likes);
        components.push(comments);
        // components.push(dateAdded);
        // components.push(dateModified);
        
        return (
            <tr id={this.props.isSelected(this.props.applicantId) ? "manage-table-row-grid-container-selected" : "manage-table-row-grid-container" }>
                {components}
            </tr>
        );
    }
}

export default TableRow;
