import React, { Component } from "react";
import "./Import.css";
import { Link } from "react-router-dom";
import api from "../../../../Api/api.js";

import exampleImage from "./Assets/example.png";
import backIcon from "./Icons/back.png";
import downloadIcon from "./Icons/download.png";
import {trackEvent} from "../../../../tracking/utils"
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
    this.setState({ selectedFile: event.target.files[0] });
  };

  sendFile = async (event) => {
    const formData = new FormData();
    formData.append("data", this.state.selectedFile);
    await api.uploadApplicantInfo(formData);
    this.props.reloadPage();
    trackEvent('importing applicants')
  };

  downloadTemplate = async (event) => {
    await api.downloadTemplate();
    trackEvent('downloading template')
  };

  render() {
    const file = this.state.selectedFile;
    return (
      <div id="import-applicants-grid-container">
        <div id="back-button-item">
          <a id="back-button-link"
            // Have onclick goto home (import1) IFF numApplicants == 0
            // Have onclick goto manage applicants (import2) IFF numApplicants >= 1
            href={this.props.allApplicants.length === 0 ?
              "/home" : "/admin/applicants"}
          >
            <button
              id="back-button-import"
            >
              <img id="small-icon" src={backIcon} alt="Back icon" />
              &nbsp;Back
          </button>
          </a>
          <p id="add-applicants-text">Add applicants to Hatch</p>
        </div>
        <div id="info-text-item">
          {/* <br /> */}
          <p>
            Compile a Excel (xlsx), either manually or by using our template, in the same format as the example
          </p>
          <p>
            For the <b>Recruiting cycle</b> field:
          </p>
          <p>
            <ul>
              <li>it can help to use a wide timeframe like “Spring 2020” that applies to many applicants</li>
              <li>check to make sure each recruiting cycle is typed the same way for all applicants</li>
            </ul>
          </p>
        </div>
        <div id="download-template-item">
          <button id="download-template-button"
            onClick={this.downloadTemplate}>
            <img id="small-icon" src={downloadIcon} alt="Download icon" />
            &nbsp;Download our template (Excel)
          </button>
        </div>
        <div id="upload-buttons-item">
          <p id="your-upload-text">
            Your upload
          </p>
          <div>
            <button id="select-file-button"
              onClick={this.uploadFile}>
              <input
                type="file"
                ref={input => this.inputElement = input}
                accept=".xlx, .xlsx"
                onChange={e => this.handleFileUploadChange(e)}
                style={{ display: 'none', position: 'absolute' }}>
              </input>
              Select a file
            </button>
            <div id="upload-text">
              {file != null ?
                <p>{file.name}</p>
                : <p>No file chosen</p>
              }
            </div>
            <button id="upload-file-button"
              onClick={this.sendFile}>
              Add selected applicants
            </button>
          </div>
        </div>
        <div id="example-item">
          <p id="large">Example</p>
          <div>
            <img id="example-image" src={exampleImage} alt="Example image" />
          </div>
        </div>
      </div>
    );
  }
};

export default Import;