import React, { Component } from "react"
import "./EditPicture.css"
import Close from "@kiwicom/orbit-components/lib/icons/Close"
import Button from "@kiwicom/orbit-components/lib/Button";
import Dialog from "@kiwicom/orbit-components/lib/Dialog";
import api from "../../../../../Api/api"

class EditPicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldFileUrl: this.props.imageURL,
            selectedFile: null,
            photoUrl: null
        }
    }

    confirmProfilePicture = async () => {
        const formData = new FormData();
        formData.append("image", this.state.selectedFile);
        const response = await api.uploadMemberImage(formData);
        this.props.closeButton();
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
    render() {
        const file = this.state.selectedFile;
        let grayCircleSrc = "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"

        let previewSRC;
        if (file == null){
            previewSRC = (this.state.oldFileUrl) ? this.state.oldFileUrl:grayCircleSrc;
        } else {
            previewSRC = this.state.photoUrl
        }
        return (
            <Dialog
                title={
                <div>
                    <div id="change-password-flex-container">
                        <span id="change-password">Change your profile picture</span>
                        <span id="close-button-change-password" onClick={this.props.closeButton}><Close/></span>
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
                primaryAction={<Button type="primary" onClick={(e) => this.confirmProfilePicture()} disabled={!file}>Confirm</Button>}
            >
            </Dialog>

        )
    }
}

export default EditPicture