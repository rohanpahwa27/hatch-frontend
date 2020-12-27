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
                          firstName={applicant.firstName} 
                          lastName={applicant.lastName} 
                          imgURL={applicant.imgURL}
                          likes={applicant.likes} 
                          comments={applicant.comments} 
                          tags={applicant.tags} />
            )
        })

        return (
            <tbody id="table-body-manage-grid-container">
                {applicantComponents}
            </tbody>
        )
    }
}

export default TableBody