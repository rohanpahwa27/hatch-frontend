import React, { Component } from "react"
import "./TableRow.css"
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox";

const Check = ({ memberID, handleSelected, isSelected}) => {
    let [checked] = React.useState(false);
    checked = isSelected(memberID)
    return (
      <Checkbox
        checked={checked}
        onChange={() => {handleSelected(memberID)
        }}
      />
    );
  };

class TableRow extends Component {
    render() {
        const isAdmin = this.props.admin
        const components = []
        const checkbox = (
            <td className="name-div table-data-cell">
                <span className="row-item checkbox"><Check memberID ={this.props.memberID} handleSelected={this.props.handleSelected} isSelected={this.props.isSelected}/></span>
            </td>
        )

        const name = (
            <td className="name-div table-data-cell">
                <img className="member-image" src={this.props.imgURL} alt="Headshot" />
                <span className="member-name row-item truncate-text-admin-members">{this.props.firstName} {this.props.lastName}</span>
            </td>
        )

        const email = (
            <td className="table-data-cell">
                <span className="row-item truncate-text-admin-members">{this.props.email}</span>
            </td>
        )

        const comments = (
            <td className="table-data-cell">
                <span className="row-item">{this.props.comments}</span>
            </td>
        )

        const votes = (
            <td className="table-data-cell">
                <span className="row-item">{this.props.votes}</span>
            </td>
        )

        const admin = (
            <td className="table-data-cell">
                {isAdmin
                    ? <span isAdmin = {this.props.admin}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.53033 12.9697C4.23744 12.6768 3.76256 12.6768 3.46967 12.9697C3.17678 13.2626 3.17678 13.7374 3.46967 14.0303L7.96967 18.5303C8.26256 18.8232 8.73744 18.8232 9.03033 18.5303L20.0303 7.53033C20.3232 7.23744 20.3232 6.76256 20.0303 6.46967C19.7374 6.17678 19.2626 6.17678 18.9697 6.46967L8.5 16.9393L4.53033 12.9697Z" fill="#252A31"/>
                        </svg>
                    </span>
                    : null
                }
            </td>
        )

        components.push(checkbox)
        components.push(name)
        components.push(email)
        components.push(comments)
        components.push(votes)
        components.push(admin)

        return (
            <tr id="member-table-row-grid-container">
                {components}
            </tr>
        )
    }
}

export default TableRow
