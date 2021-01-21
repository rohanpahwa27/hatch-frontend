import React, { Component } from "react"
import "./UploadPhoto.css"

import Modal, { ModalHeader, ModalSection, ModalFooter } from "@kiwicom/orbit-components/lib/Modal";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";

// TODO: Bring down applicant name/ID
class UploadPhoto extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            selectedFile: null,
        }
    }

    toggleShowModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
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
        const orgId = localStorage.getItem("orgID");
        console.log('test')
        formData.append("data", this.state.selectedFile);
        formData.append("orgID", orgId ? orgId : '5fcebc5bdc4d7b32372834c5');
        //TODO: pass information through pages and programatically input orgID instead of hardcoding it above
        // const response = await api.uploadApplicantPhoto(formData);
        // TODO: use shorthand for api call
        // console.log(response);
    };

    render() {
        const file = this.state.selectedFile;
        let add = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Add/SVG/ic_fluent_add_12_regular.svg"
        let grayCircleSrc = "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"
        return (
            <div id="upload-container">
                <button id ="upload-image-button" onClick={this.toggleShowModal}> 
                    <img id="add-image" src={add} alt="Add icon" />
                    Upload a picture of {this.props.data.firstName}
                </button>
                <div>
                    {this.state.isOpen ?
                        <Modal id="upload-photo-modal" onClose={this.toggleShowModal}>
                            <ModalSection>
                                <div id="upload-photo">
                                    <div id="upload-photo-header">
                                        <span> Upload a picture of {this.props.data.firstName} {this.props.data.lastName} </span>
                                    </div>
                                    <div id="upload-photo-your-upload">
                                        Your upload
                                        <div id="upload-photo-file-info">
                                            <button id="upload-photo-file-button"
                                                onClick={this.uploadFile}>
                                                <input
                                                    type="file"
                                                    ref={input => this.inputElement = input}
                                                    accept=".png, .jpg" // TODO add acceptable photo types
                                                    onChange={e => this.handleFileUploadChange(e)}
                                                    style={{ display: 'none', position: 'absolute' }}>
                                                </input>
                                                Select a file
                                            </button>
                                            <div id="upload-photo-text">
                                            {/* TODO: Limit file name length? */}
                                            {file != null ?
                                                <p>{file.name.substr(0, 15)}</p>
                                                : <p>No file chosen</p>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                    <div id="upload-photo-preview">
                                        Preview
                                        <img id="upload-photo-applicant-image" src={grayCircleSrc} alt="Applicant icon" />
                                    </div>
                                    <div id="upload-photo-confirm">
                                        <button id="upload-photo-confirm-button" onclick={this.sendFile}>
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </ModalSection>
                        </Modal> : null
                    }
                </div>
            </div>
        )
    }
}

export default UploadPhoto