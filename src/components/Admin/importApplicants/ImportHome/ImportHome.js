import React, { Component } from "react";
import "./ImportHome.css";
import { Link } from "react-router-dom";

import importImage from "./Icons/import.png";

class ImportHome extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="import-home-grid-container">
        <div id="manage-applicants-flex-container">
          <div id="applicants-text-flex-container">
            Manage your applicants
          </div>
        </div>

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
            <Link to="/import2">
              <button id="import-button">
              Import applicant information
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default ImportHome;