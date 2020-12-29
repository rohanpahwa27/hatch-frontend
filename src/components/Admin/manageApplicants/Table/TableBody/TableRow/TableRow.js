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
        const components = []

        const select = (
            <td className="manage-checkbox-div manage-table-data-cell">
                <span className="select-checkbox">
                    <Check
                        applicantId={this.props.applicantId}
                        handleSelected={this.props.handleSelected}
                        isSelected={this.props.isSelected}
                    />
                </span>
            </td>
        )

        const name = (
            <td className="manage-name-div manage-table-data-cell">
                <img className="manage-applicant-image" src={this.props.imgURL} alt="Headshot" />
                <span className="manage-applicant-name">{this.props.firstName} {this.props.lastName}</span>
            </td>
        )

        const avgScore = (
            <td className="manage-table-data-cell">
                <span>{this.props.avgScore}/20</span>
            </td>
        )

        const votes = (
            <td className="manage-table-data-cell">
                <span>{this.props.votes}</span>
            </td>
        )

        const tags = (
            <td>
                <span>{this.props.tags}</span>
            </td>
        )

        components.push(select)
        components.push(name)
        components.push(tags)
        components.push(avgScore)
        components.push(votes)

        return (
            <tr id="manage-table-row-grid-container">
                {components}
            </tr>
        )
    }
}

export default TableRow
