import React, { Component } from "react"
import "./TableRow.css"
import likesImage from "./Icons/heart.png"
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
                <img className="applicant-image" src={this.props.imgURL} alt="Headshot" />
                <span className="member-name row-item">{this.props.firstName} {this.props.lastName}</span>
            </td>
        )

        const email = (
            <td className="table-data-cell">
                <span className="row-item">{this.props.email}</span>
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
                    ? <span isAdmin = {this.props.admin}><img className="check-icon" src={likesImage}/></span>
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
