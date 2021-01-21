import React, { Component } from "react"
import "./ApplicantInfoDrop.css"
import Collapse from "@kiwicom/orbit-components/lib/Collapse";

class ApplicantInfoDrop extends Component {
    render() {
        // var applicant = this.props.data[this.props.ID]
        return (
            // TODO: don't hard code info but use the extra fields attributes that should be included
            <div id="applicantinfodrop">
                <div id="collapse">
                    <Collapse label="Applicant info">
                        <div id = "onclick"></div>
                        <span>{this.props.data.extraFields}</span>
                         {/* EXAMPLE OF HARD CODE*/}
                        {/* <div id = "title"> Year in school </div> */}
                        {/* <div id = "info"> {applicant.year} </div>
                        <div id = "title"> GPA </div>
                        <div id = "info"> {applicant.GPA}</div>
                        <div id = "title"> Major </div>
                        <div id = "info"> {applicant.major} </div>
                        <div id = "title"> Interests </div>
                        <div id = "info"> {applicant.interests}</div>
                        <div id = "title"> Hometown</div>
                        <div id = "info"> {applicant.hometown}</div> */}
                    </Collapse>
                </div>
            </div>
        )
    }
}

export default ApplicantInfoDrop