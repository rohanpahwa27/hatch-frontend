import React, { Component } from "react";
import "./importApplicants.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import api from "../../../Api/api.js";

class ImportApplicants extends Component {
    constructor() {
        super();
        this.state = {
            selectedFile: null
        }; 
      }
    
    uploadFile = event => {
        this.inputElement.click();
    };

    handleFileUploadChange = event => {
        console.log(event.target.files.length)
        console.log(event.target.files[0])
        this.setState({ selectedFile: event.target.files[0] });
        // this.sendFile();
    };

    sendFile = async (event) => {
        const formData = new FormData();
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
            <Container fluid className="login-container">
            <div className="row">
            <Col className = "column"
                sm={{ span: 12 }}
                md={{ span: 5, offset: 0 }}
                lg={{ span: 5, offset: 0 }}
            >
                
                <div className="d-flex flex-column login-card p-3 p-lg-5">
                    <div>
                    <Button onClick={this.downloadTemplate}>
                        Download Template
                    </Button>
                    </div>
                    <div>
                    <Button onClick={this.uploadFile}>
                    <input
                        type="file"
                        ref={input => this.inputElement = input}
                        accept=".xlx, .xlsx"
                        onChange={e => this.handleFileUploadChange(e)}
                        style={{display: 'none', position: 'absolute'}}>
                        </input>
                        Import Applicants
                    </Button>
                    { file != null && 
                        <div>
                            <p>{file.name}</p> 
                            <Button onClick={this.sendFile}>
                                Upload File
                            </Button>
                        </div>
                    }
                    </div>
                </div>
                </Col>
                <Col>
                    <div>
                    <p className="companyName">hatch</p>
                    <p className="mission">Empowering people in organizations to recruit<br></br>members successfully, together.</p>
                    </div>
                    <div>
                    </div>
                </Col>
            </div>
            
        </Container>
        );
    }
  };

export default ImportApplicants;