import React, { Component } from "react";
import "./Home.css"
import applicantData from "./ApplicantData.js"

import Table from "./Table/Table.js";
import Logo from "./Logo/Logo.js"
import SideNavBar from "./SideNavBar/SideNavBar.js"
import SearchAndFilter from "./SearchFilter/SearchFilter.js"
import ShowingApplicantsLabel from "./ShowingApplicantsLabel/ShowingApplicantsLabel.js"

class Home extends Component {
    constructor() {
        super()
        this.state = {tableData: applicantData, query: "", numApplicantsShowing: applicantData.length}

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
            numApplicantsShowing: filteredApplicants.length
        })
    }

    render() {
        return (
            <div id="home-grid-container">
                <Logo />
                <SearchAndFilter query={this.state.query} handleChange={this.handleChange} />
            
                <ShowingApplicantsLabel numApplicantsShowing={this.state.numApplicantsShowing} totalApplicants={applicantData.length} />

                <SideNavBar />
                <Table data={this.state.tableData} />
            </div>
        )
    }
}

export default Home