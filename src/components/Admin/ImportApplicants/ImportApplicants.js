import React, { Component } from "react";
import "./ImportApplicants.css";
import { Link } from "react-router-dom";
import Import from "./Import/Import.js";

import importImage from "./Icons/import1.png";

class ImportApplicants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // onImportPage: this.props.allApplicants.length === 0 ?
      //  false : true,
    }
  }

  // toggleImportPage = () => {
  //   this.setState({
  //     onImportPage: !this.state.onImportPage
  //   });
  // }

  render() {
    return (
      <div>
        {/* {
          this.state.onImportPage ?
            <Import
              allApplicants={this.props.allApplicants}
              toggleImportPage={this.toggleImportPage}
              toggleShowImport={this.props.toggleShowImport}
              reloadPage={this.props.reloadPage}
            />
            : */}
            <div id="import-home-grid-container">
              <div id="import-grid-container">
                {/* div flex start container 1 - icon */}
                <div id="import-icon-container">
                  <img id="import-icon" src={importImage} alt="Import image" />
                </div>
                {/* div flex center container 2 - text*/}
                <div id="import-text-container">
                  <p> You don't have any applicants added to your organization yet. Let's change that.</p>
                </div>
                {/* div flex end container 3 - button */}
                <div id="import-button-container">
                  <Link to="/admin/applicants">
                    <button
                      id="import-button"
                    // onClick={this.gotoAdminImport}
                    >
                      Import applicant information
                  </button>
                  </Link>
                </div>
              </div>
            </div>
        {/* } */}
      </div>
    );
  }
};

export default ImportApplicants;