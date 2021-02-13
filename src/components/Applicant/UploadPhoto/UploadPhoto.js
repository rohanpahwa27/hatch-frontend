import React, { Component } from "react"
import "./UploadPhoto.css"
import Close from "@kiwicom/orbit-components/lib/icons/Close"
import Dialog from "@kiwicom/orbit-components/lib/Dialog"
import Button from "@kiwicom/orbit-components/lib/Button"

import api from "../../../Api/api"

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
        console.log("hello")
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
        // formData.append("applicantId", this.props.applicant._id);
        formData.append("image", this.state.selectedFile);
        response = await api.uploadApplicantImage(formData);
        console.log(response);
        this.toggleShowModal();
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
                        <Dialog
                        title={
                        <div>
                            <div id="change-password-flex-container">
                                <span id="change-password">Upload a picture of {this.props.applicant.firstName} {this.props.applicant.lastName}</span>
                                <span id="close-button-change-password" onClick={this.toggleShowModal}><Close/></span>
                            </div>
                            <div id="change-password-flex-container" className="edit-profile-picture-container-padding">
                                <div>
                                    <span id="your-upload-text">Your Upload</span>
                                    <Button type="secondary" onClick={this.uploadFile}>Select a file<input
                                        type="file"
                                        ref={input => this.inputElement = input}
                                        accept="image/*"
                                        onChange={e => this.handleFileUploadChange(e)}
                                        style={{ display: 'none', position: 'absolute' }}
                                        >
                                    </input></Button>
                                </div>
                                
                                <div>
                                    <span id="your-upload-text">Preview</span>
                                    <div>
                                        <img id="preview-profile-image" src={previewSRC} alt="Applicant icon" />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        }
                        primaryAction={<Button type="primary" onClick={(e) => this.sendFile()} disabled={!file}>Confirm</Button>}
                        >
                        </Dialog> : null
                    }
                </div>
            </div>
        )
    }
}

export default UploadPhoto