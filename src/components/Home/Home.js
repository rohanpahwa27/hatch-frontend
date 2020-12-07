import React, { Component } from "react";
import "./Home.css"
import applicantData from "./ApplicantData.js"
import { initializeIcons } from '@uifabric/icons';
import { Icon } from '@fluentui/react/lib/Icon';

class Home extends Component {
    // componentDidMount() {
    //     initializeIcons();
    // }

    render() {
        let tableData = []

        /* For each applicant, make a div for their name, their # of likes, 
        their # of comments, and their tags and add these divs to the array tableData.
        This data will be displayed in the return
        */
        for (let i = 0; i < applicantData.length; i++) {
            const nameDiv = (
                <div className="name-div table-data-cell">
                    <img className="applicant-image" src={applicantData[i].imgURL} />
                    <span className="applicant-name">{applicantData[i].firstName} {applicantData[i].lastName}</span>
                </div>
            )

            const likesDiv = (
                <div className="table-data-cell">
                    <Icon className="heart-icon" iconName="Heart" />
                    <span>{applicantData[i].likes}</span>
                </div>
            )

            const commentsDiv = (
                <div className="table-data-cell">
                    <Icon className="comment-icon" iconName="Comment" />
                    <span>{applicantData[i].comments}</span>
                </div>
            )
            const tagsDiv = (
                <div>
                    <span>{applicantData[i].tags}</span>
                </div>
            )

            tableData.push(nameDiv)
            tableData.push(likesDiv)
            tableData.push(commentsDiv)
            tableData.push(tagsDiv)
        }

        initializeIcons();
        return (
            <div>
                <div id="table-header-grid-container">
                    <div id="name-header" className="table-header">
                        <span class="table-header-text">Name</span>
                    </div>
                    <div id="likes-header" className="table-header">
                        <span class="table-header-text">Likes</span>
                    </div>
                    <div id="comments-header" className="table-header"> 
                        <span class="table-header-text">Comments</span>
                    </div>
                    <div id="tags-header-grid-item" className="table-header"> 
                        <span class="table-header-text">Tags</span>
                    </div>
                </div>
                <div id="table-body-grid-container">
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                </div>
            </div>
        )
    }
}

export default Home