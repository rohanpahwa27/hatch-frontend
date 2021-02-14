import React, { Component } from "react";
import "./TableBody.css"

import TableRow from "./TableRow/TableRow.js"

/* we'll probably end up getting passed down an object of filtered applicants
from Table as a prop
*/
class TableBody extends Component {
    render() {
        const applicantComponents = this.props.data.map((applicant, index) => {
            if (applicant.imageUrl) {
                return (
                    <TableRow
                        key={index}
                        applicantId={applicant._id}
                        firstName={applicant.firstName}
                        lastName={applicant.lastName}
                        imageUrl={applicant.imageUrl}
                        likes={applicant.likes.length}
                        comments={applicant.comments.length}
                        tags={applicant.tags}
                        handleSelected={this.props.handleSelected}
                        isSelected={this.props.isSelected}
                    />
                )
            }
            else {
                return (
                    <TableRow
                        key={index}
                        applicantId={applicant._id}
                        firstName={applicant.firstName}
                        lastName={applicant.lastName}
                        imageUrl= 'https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg'
                        likes={applicant.likes.length}
                        comments={applicant.comments.length}
                        tags={applicant.tags}
                        handleSelected={this.props.handleSelected}
                        isSelected={this.props.isSelected}
                    />
                )

            }
        })

        return (
            <tbody id="table-body-manage-grid-container">
                {applicantComponents}
            </tbody>
        )
    }
}

export default TableBody