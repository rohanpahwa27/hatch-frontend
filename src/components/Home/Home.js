import React, { Component } from "react";
import "./Home.css"
import applicantData from "./ApplicantData.js"

class Home extends Component {
    render() {
        let tableData = []

        /* For each applicant, make a div for their name, their # of likes, 
        their # of comments, and their tags and add these divs to the array tableData.
        This data will be displayed in the return
        */
        for (let i = 0; i < applicantData.length; i++) {
            const nameDiv = (
                <div>
                    {applicantData[i].firstName}
                </div>
            )

            const likesDiv = (
                <div>
                    {applicantData[i].likes}
                </div>
            )

            const commentsDiv = (
                <div>
                    {applicantData[i].comments}
                </div>
            )
            const tagsDiv = (
                <div>
                    {applicantData[i].tags}
                </div>
            )

            tableData.push(nameDiv)
            tableData.push(likesDiv)
            tableData.push(commentsDiv)
            tableData.push(tagsDiv)
        }

        return (
            <div id="table-grid-container">
                <div id="name-grid-item">
                    <p id="name-header-text">Name</p>
                </div>
                <div id="likes-grid-item">
                    <p>Likes</p>
                </div>
                <div id="comments-grid-item"> 
                    <p>Comments</p>
                </div>
                <div id="tags-grid-item"> 
                    <p>Tags</p>
                </div>

                {tableData}
                {tableData}
                {tableData}
                {tableData}
            </div>
        )
    }
}

export default Home