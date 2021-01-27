import React, { Component } from "react";
import "./Import.css";
import api from "../../../../Api/api.js";

import exampleImage from "./Assets/example.png";
import backIcon from "./Icons/back.png";
import downloadIcon from "./Icons/download.png";

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
    this.sendFile();
  };

  sendFile = async (event) => {
    const formData = new FormData();
    formData.append("data", this.state.selectedFile);
    await api.uploadApplicantInfo(formData);
  };

  downloadTemplate = async (event) => {
    await api.downloadTemplate();
  };

  render() {
    const file = this.state.selectedFile;
    return (
      <div id="import-applicants-grid-container">
        <div id="back-button-item">
          <button
            id="back-button"
            onClick={this.props.toggleImportPage}
          >
            <img id="small-icon" src={backIcon} alt="Back icon" />
              &nbsp;Back
          </button>
        </div>
        <div id="download-template-item">
          <p id="large">Add applicants to Hatch</p>
          <br />
          <p>
            Compile a Excel (xlsx) or comma separated value (csv) file, either manually or by using our template, in the same format as the example
          </p>
          <br />
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