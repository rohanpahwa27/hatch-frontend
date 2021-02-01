import React, { Component } from "react"
import "./UploadPhoto.css"

import Modal, { ModalSection } from "@kiwicom/orbit-components/lib/Modal";

class UploadPhoto extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            selectedFile: null,
            photoUrl: null
        }
    }

    toggleShowModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
        // Reset Upload Photo preview to profile photo if not confirmed
        if (!this.state.isOpen) {
            this.state.selectedFile = null
        }
    }

    uploadFile = event => {
        this.inputElement.click();
    };

    handleFileUploadChange = async (event) => {
        const file = event.target.files[0]
        const fileReader = new FileReader()
        this.setState({ selectedFile: event.target.files[0] });
        fileReader.onloadend = () => {
            this.setState({selectedFile: file, photoUrl: fileReader.result})
        }
        if(file) {
            fileReader.readAsDataURL(file)
        }
    };

    

    sendFile = async (event) => {
        const formData = new FormData();
        const orgId = localStorage.getItem("orgID");
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
        
        let previewSRC;
        if (file == null){
            previewSRC = (this.props.applicant.imageUrl) ? this.props.applicant.imageUrl : grayCircleSrc;
        } else {
            previewSRC = this.state.photoUrl
        }

        return (
            <div id="upload-container">
                <button id ="upload-image-button" onClick={this.toggleShowModal}> 
                    <img id="add-image" src={add} alt="Add icon" />
                    Upload a picture of {this.props.applicant.firstName}
                </button>
                <div>
                    {this.state.isOpen ?
                        <Modal id="upload-photo-modal" onClose={this.toggleShowModal}>
                            <ModalSection>
                                <div id="upload-photo">
                                    <div id="upload-photo-header">
                                        <span> Upload a picture of {this.props.applicant.firstName} {this.props.applicant.lastName} </span>
                                    </div>
                                    <div id="upload-photo-your-upload">
                                        Your upload
                                        <div id="upload-photo-file-info">
                                            <button id="upload-photo-file-button"
                                                onClick={this.uploadFile}>
                                                <input
                                                    type="file"
                                                    ref={input => this.inputElement = input}
                                                    accept="image/*" // TODO add acceptable photo types
                                                    onChange={e => this.handleFileUploadChange(e)}
                                                    style={{ display: 'none', position: 'absolute' }}>
                                                </input>
                                                Select a file
                                            </button>
                                        </div>
                                    </div>
                                    <div id="upload-photo-preview">
                                        Preview
                                        <img id="upload-photo-applicant-image" src={previewSRC} alt="Applicant icon" />
                                    </div>
                                    <div id="upload-photo-confirm">
                                        <button id="upload-photo-confirm-button" onClick={this.sendFile}>
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