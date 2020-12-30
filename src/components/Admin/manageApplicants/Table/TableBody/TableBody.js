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
                <TableRow
                    key={index}
                    applicantId={applicant.objectID}
                    firstName={applicant.firstName}
                    lastName={applicant.lastName}
                    imgURL={applicant.imgURL}
                    avgScore={applicant.avgScore}
                    votes={applicant.votes}
                    tags={applicant.tags}
                    handleSelected={this.props.handleSelected}
                    isSelected={this.props.isSelected}
                />
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