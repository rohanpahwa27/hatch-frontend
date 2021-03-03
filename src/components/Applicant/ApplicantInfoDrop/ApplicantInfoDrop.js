import React, { Component } from "react"
import "./ApplicantInfoDrop.css"
import Collapse from "@kiwicom/orbit-components/lib/Collapse";

class ApplicantInfoDrop extends Component {
    
    render() {
        const FieldMapping = ({extraFields, extraFieldContents}) => (
            <>
              {extraFields.map((extraField, index) => (
                  <div id = "field" key={extraField}>
                    <div id = "title" key={extraField}>{extraField} </div>
                    <div id = "info" key={index}> {extraFieldContents[index] ? extraFieldContents[index] : ""}</div>
                  </div>
              ))}
            </>
        );
        return (
            (this.props.applicant.extraFields.length > 1) ?
            <div id="applicantinfodrop">
                <div id="collapse">
                    <Collapse label="Applicant info">
                        <div id = "onclick"></div>
                        <FieldMapping extraFields={this.props.applicant.extraFields[0]} extraFieldContents={this.props.applicant.extraFields[1]} />
                    </Collapse>
                </div>
            </div> : null
        )
    }
}

export default ApplicantInfoDrop