import React, { Component } from "react"
import "./ApplicantInfoDrop.css"
import Collapse from "@kiwicom/orbit-components/lib/Collapse";

class ApplicantInfoDrop extends Component {
    
    render() {
        const fields = this.props.applicant.extraFields.map(el => 
            {
                return Object.keys(el)[0].split(":")[0]
            });

        const contents = this.props.applicant.extraFields.map(el =>
            {
                return el[Object.keys(el)[0]]
            });
        
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
            (this.props.applicant.extraFields) ?
            <div id="applicantinfodrop">
                <div id="collapse">
                    <Collapse label="Applicant info">
                        <div id = "onclick"></div>
                        <FieldMapping extraFields={fields} extraFieldContents={contents} />
                    </Collapse>
                </div>
            </div> : null
        )
    }
}

export default ApplicantInfoDrop