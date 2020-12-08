import React, { Component } from "react";
import "./Home.css"
import applicantData from "./ApplicantData.js"

import Table from "./Table/Table.js";
import Logo from "./Logo/Logo.js"
import SideNavBar from "./SideNavBar/SideNavBar.js"
import Filter from "./Filter/Filter.js"

import searchImage from "./Icons/search.png"

class Home extends Component {
    constructor() {
        super()
        this.state = {tableData: applicantData, query: "", numApplicants: applicantData.length}

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const queryText = event.target.value

        const filteredApplicants = applicantData.filter(applicant => {
            const applicantFullName = applicant.firstName + " " + applicant.lastName
            return applicantFullName.toLowerCase().indexOf(queryText) > -1;
        })

        this.setState({
            tableData: filteredApplicants,
            query: queryText,
            numApplicants: filteredApplicants.length
        })
    }

    render() {
        return (
            <div id="home-grid-container">
                <Logo />

                {/* Search and filter */}
                <div id="search-filter-grid-item">
                    <div id="search-filter-flex-container">
                        <div id="search-bar-flex-container">
                            <img id="search-icon" src={searchImage} alt="Search image" />
                            <input id="search-bar-textbox" type="text" placeholder="search applicants" value={this.state.query} onChange={event => this.handleChange(event)} />
                        </div>
                        <Filter />
                    </div>
                </div>
            
                {/* Showing x out of y applicants */}
                <div id="showing-x-applicants">
                    <span>Showing {this.state.numApplicants} of {applicantData.length} applicants</span>
                </div>

                <SideNavBar query={this.state.query} handleChange={this.handleChange} />
                <Table data={this.state.tableData} />
            </div>
        )
    }
}

export default Home