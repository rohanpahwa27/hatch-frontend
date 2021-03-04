import React, { Component } from "react";
import "../ImportApplicants/ImportApplicants.css"
import importImage from "../ImportApplicants/Icons/import1.png";

class EmptyState extends Component {
    constructor() {
        super()
        this.state = {
            orgCode:null
        }
    }
  render() {
    return (
      <div>
            <div id="empty-members-grid-container">
              <div id="import-grid-container">
                <div id="import-icon-container">
                  <img id="import-icon" src={importImage} alt="Import image" />
                </div>
                <div id="import-text-container">
                  <p id="empty-state-text"> No members have joined your group on Hatch yet. Let them know to make an account at hatchrecruiting.com using your add code!</p>
                </div>
                <div id="import-button-container">
                    <span id="group-add-code-empty-state">Your group's add code: {this.props.orgCode}</span>
                    <span id="get-new-code-empty-state" onClick={this.props.generateOrgCode}><br></br>get a new code</span>
                </div>
              </div>
            </div>
      </div>
    );
  }
};

export default EmptyState;