import React, { Component } from "react";
import "./Import.css";
import api from "../../Api/api.js";

import importImage from "./Icons/import.png";

class Import extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null
    };
  }

  uploadFile = event => {
    this.inputElement.click();
  };

  handleFileUploadChange = async (event) => {
    console.log(event.target.files.length)
    console.log(event.target.files[0])
    this.setState({ selectedFile: event.target.files[0] });
    this.sendFile();
  };

  sendFile = async (event) => {
    const formData = new FormData();
    console.log('test')
    formData.append("data", this.state.selectedFile);
    formData.append("org_id", '5fcebc5bdc4d7b32372834c5');
    //TODO: pass information through pages and programatically input orgID instead of hardcoding it above
    const response = await api.uploadApplicantInfo(formData);
    console.log(response);
  };

  downloadTemplate = async (event) => {
    await api.downloadTemplate();
  };

  render() {
    const file = this.state.selectedFile;
    return (
      <div id="grid-container">

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
            <button id="import-button" onClick={this.uploadFile}>
              <input
                type="file"
                ref={input => this.inputElement = input}
                accept=".xlx, .xlsx"
                onChange={e => this.handleFileUploadChange(e)}
                style={{ display: 'none', position: 'absolute' }}>
              </input>
              Import applicant information
              </button>
          </div>
        </div>

        {file != null &&
          <div id="upload-button-container">
            <div id="upload-filename">
              <p>{file.name}</p>
            </div>
            <button id="upload-button" onClick={this.sendFile}>
              Upload file
          </button>
          </div>
        }
      </div>
    );
  }
};

export default Import;