import React, { Component } from "react"
import "./TableRow.css"

class TableRow extends Component {
    render() {
        const components = []

        const select = (
            <td className="manage-checkbox-div manage-table-data-cell">
                <input className="select-checkbox" type="checkbox" />
            </td>   
        )

        const name = (
            <td className="manage-name-div manage-table-data-cell">
                <img className="manage-applicant-image" src={this.props.imgURL} alt="Headshot" />
                <span className="manage-applicant-name">{this.props.firstName} {this.props.lastName}</span>
            </td>
        )

        const likes = (
            <td className="manage-table-data-cell">
                <span>{this.props.likes}/20</span>
            </td>
        )

        const comments = (
            <td className="manage-table-data-cell">
                <span>{this.props.comments}</span>
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
        components.push(likes)
        components.push(comments)

        return (
            <tr id="manage-table-row-grid-container">
                {components}
            </tr>
        )
    }
}

export default TableRow
