import React, { Component } from "react";
import "./Home.css"
import applicantData from "./ApplicantData.js"

import Table from "./Table/Table.js";
import Logo from "./Logo/Logo.js"
import SideNavBar from "./SideNavBar/SideNavBar.js"

class Home extends Component {
    constructor() {
        super()
        this.state = {tableData: applicantData, query: ""}

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
            query: queryText
        })
    }

    render() {
        return (
            <div id="home-grid-container">
                <Logo />
                <div id="search-bar-flex-container">
                    <input id="search-bar-textbox" type="text" placeholder="search applicants" value={this.state.query} onChange={event => this.handleChange(event)} />
                </div>
                <SideNavBar query={this.state.query} handleChange={this.handleChange} />
                <Table data={this.state.tableData} />
            </div>
        )
    }
}

export default Home