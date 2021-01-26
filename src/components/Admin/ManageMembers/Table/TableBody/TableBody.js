import React, { Component } from "react";
import "./TableBody.css"

import TableRow from "./TableRow/TableRow"

/* we'll probably end up getting passed down an object of filtered applicants
from Table as a prop
*/
class TableBody extends Component {
    render() {
        const memberComponents = this.props.data.map((member, index) => {
            let admin = member.organizations[0].isAdmin
            let numComments = member.organizations[0].numComments;
            if (member.imageUrl){
                return (
                    <TableRow key={index}
                              memberID={member._id} 
                              firstName={member.firstName} 
                              lastName={member.lastName} 
                              imgURL={member.imageUrl}
                              comments={numComments} 
                              email={member.email} 
                              admin = {admin}
                              handleSelected={this.props.handleSelected}
                              isSelected={this.props.isSelected}/>
                )
            } else {
                return (
                    <TableRow key={index}
                              memberID={member._id} 
                              firstName={member.firstName} 
                              lastName={member.lastName} 
                              imgURL= 'https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg'
                              comments={numComments} 
                              email={member.email} 
                              admin = {admin}
                              handleSelected={this.props.handleSelected}
                              isSelected={this.props.isSelected}/>
                )
            }
        })

        return (
            <tbody id="table-body-grid-container">
                {memberComponents}
            </tbody>
        )
    }
}

export default TableBody