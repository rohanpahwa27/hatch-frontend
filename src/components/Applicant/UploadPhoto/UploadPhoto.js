import React, { Component } from "react"
import "./UploadPhoto.css"

class UploadPhoto extends Component {
    render() {
        let add = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Add/SVG/ic_fluent_add_12_regular.svg"
        return (
            <div id="uploadphoto">
                <img id="add-image" src={add} alt="Add icon" />
                Upload a picture of Emily
            </div>
        )
    }
}

export default UploadPhoto