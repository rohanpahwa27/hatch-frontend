import React, { Component } from "react"
import "./ApplicantInfoDrop.css"
import Collapse from "@kiwicom/orbit-components/lib/Collapse";

class ApplicantInfoDrop extends Component {
    render() {
        return (
            <div id="applicantinfodrop">
                <div id="collapse">
                    <Collapse label="Applicant info">
                        <div id = "onclick"></div>
                        {/* TODO: Later do a foreach on the ApplicantData */}
                        <div id = "title"> 
                        Year in school
                        </div>
                        <div id = "info"> 
                        Freshman
                        </div>
                        <div id = "title"> 
                        GPA
                        </div>
                        <div id = "info"> 
                        4.0
                        </div><div id = "title"> 
                        Major
                        </div>
                        <div id = "info"> 
                        Human Centered Design and Engineering
                        </div><div id = "title"> 
                        Interests
                        </div>
                        <div id = "info"> 
                        Stardew valley, watching TikTok, staring at the wall, coffee
                        </div><div id = "title"> 
                        Hometown
                        </div>
                        <div id = "info"> 
                        Seattle, WA
                        </div>

                    </Collapse>
                </div>
            </div>
        )
    }
}

export default ApplicantInfoDrop