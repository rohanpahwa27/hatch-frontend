import React, { Component } from "react"
import "./TableRow.css"
import { initializeIcons } from '@uifabric/icons';
import { Icon } from '@fluentui/react/lib/Icon';

// import props
// should be firstname, lastname, likes, comments, tags
class TableRow extends Component {
    render() {
        const components = []

        const name = (
            <td className="name-div table-data-cell">
                <img className="applicant-image" src={this.props.imgURL} />
                <span className="applicant-name">{this.props.firstName} {this.props.lastName}</span>
            </td>
        )

        const likes = (
            <td className="table-data-cell">
                <Icon className="heart-icon" iconName="Heart" />
                <span>{this.props.likes}</span>
            </td>
        )

        const comments = (
            <td className="table-data-cell">
                <Icon className="comment-icon" iconName="Comment" />
                <span>{this.props.comments}</span>
            </td>
        )

        const tags = (
            <td>
                <span>{this.props.tags}</span>
            </td>
        )

        components.push(name)
        components.push(likes)
        components.push(comments)
        components.push(tags)

        initializeIcons();

        return (
            <tr id="table-row-grid-container">
                {components}
            </tr>

        )
    }
}

export default TableRow