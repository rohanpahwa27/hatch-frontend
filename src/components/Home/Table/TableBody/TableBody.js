import React, { Component } from "react";
import "./TableBody.css"

import TableRow from "./TableRow/TableRow.js"

/* we'll probably end up getting passed down an object of filtered applicants
from Table as a prop
*/
class TableBody extends Component {
    render() {
        const applicantComponents = this.props.data.map((applicant, index) => {
            return (
                <TableRow key={index}
                          id={applicant.id}
                          firstName={applicant.firstName} 
                          lastName={applicant.lastName} 
                          imgURL={applicant.imgURL}
                          likes={applicant.likes} 
                          comments={applicant.comments} 
                          tags={applicant.tags}
                          email={applicant.email}
                          handleClick={this.props.handleClick}/>
            )
        })

        return (
            <tbody id="table-body-grid-container">
                {applicantComponents}
            </tbody>
        )
    }
}

export default TableBody