import React, { Component } from "react";
import "./TableBody.css"
import applicantData from "./../../ApplicantData.js"
import { initializeIcons } from '@uifabric/icons';
import { Icon } from '@fluentui/react/lib/Icon';

import TableRow from "./TableRow/TableRow.js"

// we'll probably end up getting passed down an object of filtered applicants
class TableBody extends Component {
    render() {
        initializeIcons();

        const applicantComponents = applicantData.map((applicant, index) => {
            return (
                <TableRow key={index} 
                          firstName={applicant.firstName} 
                          lastName={applicant.lastName} 
                          likes={applicant.likes} 
                          comments={applicant.comments} 
                          tags={applicant.tags} />
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