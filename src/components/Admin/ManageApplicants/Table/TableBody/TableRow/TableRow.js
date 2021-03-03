import React, { Component } from "react"
import "./TableRow.css"
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox";

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
                <span className="manage-row-item manage-applicant-name">&nbsp;{this.props.firstName} {this.props.lastName}</span>
            </td>
        );

        const likes = (
            <td className="manage-table-data-cell">
                <span className="manage-row-item">{this.props.likes}</span>
            </td>
        );

        const comments = (
            <td className="manage-table-data-cell">
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
            <tr id="manage-table-row-grid-container">
                {components}
            </tr>
        );
    }
}

export default TableRow;
