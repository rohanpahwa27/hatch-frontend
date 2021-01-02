import React, { Component } from "react";
import "./TableBody.css"

import TableRow from "./TableRow/TableRow"

/* we'll probably end up getting passed down an object of filtered applicants
from Table as a prop
*/
class TableBody extends Component {
    render() {
        const memberComponents = this.props.data.map((member, index) => {
            return (
                <TableRow key={index}
                          memberID={member._id} 
                          firstName={member.firstName} 
                          lastName={member.lastName} 
                          imgURL={member.imgURL}
                          comments={member.numComments} 
                          email={member.email} 
                          admin = {member.isAdmin}
                          handleSelected={this.props.handleSelected}
                          isSelected={this.props.isSelected}/>
            )
        })

        return (
            <tbody id="table-body-grid-container">
                {memberComponents}
            </tbody>
        )
    }
}

export default TableBody