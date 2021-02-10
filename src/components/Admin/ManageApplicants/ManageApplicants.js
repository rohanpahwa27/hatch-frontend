import React, { Component } from "react";
import "./ManageApplicants.css";
import api from "../../../Api/api";
import Navbar from "../../Navbar/Navbar.js";

import ImportApplicants from "../ImportApplicants/ImportApplicants.js";
import TableToolbar from "./TableToolbar/TableToolbar.js";
import Table from "./Table/Table.js";
import UpdateApplicantsCard from "./UpdateApplicantsCard/UpdateApplicantsCard.js";

import Logo from "../../Page/Logo/Logo.js";
import SideNavBar from "../../SideNavBar/SideNavBar.js";

class ManageApplicants extends Component {
    constructor() {
        super();
        this.state = {
            allApplicantData: null,
            tableData: [],
            query: "",
            selected: new Set(),
            numApplicantsShowing: 0,
            sortBy: "name",
            sortDirection: "descending",
            orgCode: ""
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.sortByName = this.sortByName.bind(this);
        this.sortByAvgScore = this.sortByAvgScore.bind(this);
        this.sortByVotes = this.sortByVotes.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.updateApplicants = this.updateApplicants.bind(this);
        this.deleteApplicants = this.deleteApplicants.bind(this);
    }

    componentDidMount = async () => {
        try {
            const orgId = localStorage.getItem("orgID");
            const applicantResponse = await api.getApplicantsInOrg(orgId);
            let applicantData = applicantResponse.data.applicants;
            const index = applicantData.map(function (e) { return e._id; }).indexOf(localStorage.getItem('userID'));
            if (index > -1) applicantData.splice(index, 1);

            const organizationResponse = await api.getOrgById(orgId);
            const orgCode = organizationResponse.data.organization.addCode;
            this.setState({
                allApplicantData: applicantData,
                tableData: applicantData,
                numApplicantsShowing: applicantData.length,
                orgCode: orgCode
            });
        } catch (error) {

        }
        this.sortByName(this.state.tableData, "ascending");
    }


    isSelected(applicantId) {
        return this.state.selected.has(applicantId);
    }

    handleSelected(applicantId) {
        const selected = this.state.selected;
        selected.has(applicantId) ? selected.delete(applicantId) : selected.add(applicantId);
        this.setState({ selected: selected });
        console.log(this.state.selected);
        return;
    }

    selectAll() {
        if (this.state.selected.size == this.state.tableData.length) {
            this.setState({ selected: new Set() });
            return;
        }
        console.log(this.state.tableData)
        let selectAll = new Set();
        this.state.tableData.map((applicant) => {
            selectAll.add(applicant._id);
        })
        this.setState({ selected: selectAll });
    }

    handleSearch(event) {
        const queryText = event.target.value;
        const { allApplicantData } = this.state;

        // filtering applicantData is the problem here
        const filteredApplicants = allApplicantData.filter(applicant => {
            const applicantFullName = applicant.firstName + " " + applicant.lastName;
            return applicantFullName.toLowerCase().indexOf(queryText) > -1;
        })

        this.setState({
            tableData: filteredApplicants,
            query: queryText,
            numApplicantsShowing: filteredApplicants.length
        })

        // console.log(this.state.tableData.length)

        // console.log(filteredApplicants.length)
        if (this.state.sortBy === "name") {
            this.sortByName(filteredApplicants, this.state.sortDirection);
        }
        else if (this.state.sortBy === "avgScore") {
            this.sortByAvgScore(filteredApplicants, this.state.sortDirection);
        }
        else if (this.state.sortBy === "votes") {
            this.sortByVotes(filteredApplicants, this.state.sortDirection);
        }
    }

    handleSort(event) {
        const classNames = event.target.className;

        // if the name header is clicked
        if (classNames.indexOf("name") > -1) {
            let direction = "ascending";
            /* we only want to sort alphaetically in descending order 
            if the user was already sorting names alphabetically in ascending order.
            if the user was previously sorting by avgScore and votes and clicks
            on the names tab, then the default should be to sort in ascending order
            */
            if (this.state.sortBy === "name" && this.state.sortDirection === "ascending") {
                direction = "descending";
            }

            this.sortByName(this.state.tableData, direction);
        }

        // if the avgScore header is clicked
        else if (classNames.indexOf("avgScore") > -1) {
            let direction = "descending";
            if (this.state.sortBy === "avgScore" && this.state.sortDirection === "descending") {
                direction = "ascending";
            }
            this.sortByAvgScore(this.state.tableData, direction);
        }
        // if the votes header is clicked
        else if (classNames.indexOf("votes") > -1) {
            let direction = "descending";
            if (this.state.sortBy === "votes" && this.state.sortDirection === "descending") {
                direction = "ascending";
            }
            this.sortByVotes(this.state.tableData, direction);
        }
    }

    sortByName(applicantsArray, direction) {
        /* need to make a copy because if the caller of the function passes
        in this.state.tableData, we don't want to change the contents of that array */
        const tableDataCopy = applicantsArray

        // sort in ascending order
        if (direction === "ascending") {
            tableDataCopy.sort((a, b) => {

                const aFullName = a.firstName + " " + a.lastName
                const bFullName = b.firstName + " " + b.lastName

                /* if a has a full name that is earlier in the alphabet than b, 
                put it earlier in the array */
                if (aFullName < bFullName) {
                    return -1
                }
                else if (bFullName < aFullName) {
                    return 1
                }

                return 0
            })

            this.setState({
                sortDirection: "ascending"
            })
        }
        // sort in descending order
        else {
            tableDataCopy.sort((a, b) => {

                const aFullName = a.firstName + " " + a.lastName
                const bFullName = b.firstName + " " + b.lastName

                /* if a has a full name that is later in the alphabet than b, 
                put it earlier in the array */
                if (aFullName > bFullName) {
                    return -1
                }
                else if (bFullName > aFullName) {
                    return 1
                }

                return 0
            })

            this.setState({
                sortDirection: "descending"
            })
        }

        // update data we pass down to the table to the sorted data
        this.setState({
            tableData: tableDataCopy,
            sortBy: "name"
        })
    }

    sortByAvgScore(applicantsArray, direction) {
        // clone array
        const tableDataCopy = applicantsArray

        // sort in ascending order
        if (direction === "ascending") {
            tableDataCopy.sort((a, b) => {
                if (a.avgScore < b.avgScore) {
                    return -1
                }
                else if (a.avgScore < b.avgScore) {
                    return 1
                }

                return 0
            })

            this.setState({
                sortDirection: "ascending"
            })
        }
        // sort in descending order
        else {
            tableDataCopy.sort((a, b) => {
                if (a.avgScore > b.avgScore) {
                    return -1
                }
                else if (a.avgScore > b.avgScore) {
                    return 1
                }

                return 0
            })

            this.setState({
                sortDirection: "descending"
            })
        }

        // update data we pass down to the table to the sorted data
        this.setState({
            tableData: tableDataCopy,
            sortBy: "avgScore"
        })
    }

    sortByVotes(applicantsArray, direction) {
        // clone array
        const tableDataCopy = applicantsArray

        /* if sortDirection was ascending before click or the user was sorting by
        another variable, then we want to sort descending by votes 
        */
        if (direction === "ascending") {
            tableDataCopy.sort((a, b) => {

                if (a.votes < b.votes) {
                    return -1
                }
                else if (a.votes < b.votes) {
                    return 1
                }

                return 0
            })

            this.setState({
                sortDirection: "ascending"
            })
        }
        else {
            tableDataCopy.sort((a, b) => {
                if (a.votes > b.votes) {
                    return -1
                }
                else if (a.votes > b.votes) {
                    return 1
                }

                return 0
            })

            this.setState({
                sortDirection: "descending"
            })
        }

        // update data we pass down to the table to the sorted data
        this.setState({
            tableData: tableDataCopy,
            sortBy: "votes"
        })
    }

    updateApplicants() {
        this.setState({ selected: new Set() })
    }

    deleteApplicants() {
        this.setState({ selected: new Set() })
    }

    render() {
        return (
            <div id="page-grid-container">
                <Logo />
                <SideNavBar />
                <div id="navbar-content-grid-container">
                    <Navbar />
                    {this.state.allApplicantData === null ?
                        <div>{this.state.allApplicantData}</div>
                        :
                        <div>
                            {this.state.allApplicantData.length === 0 ?
                                <ImportApplicants />
                                :
                                (
                                    <div id="manage-applicant-grid-container">
                                        {/* Pass handleSort function down all the way to TableHeader */}
                                        <TableToolbar
                                            numApplicantsShowing={this.state.numApplicantsShowing}
                                            totalApplicants={this.state.allApplicantData.length}
                                            query={this.state.query}
                                            handleSearch={this.handleSearch}
                                        />
                                        <Table
                                            data={this.state.tableData}
                                            handleSelected={this.handleSelected}
                                            selectAll={this.selectAll}
                                            isSelected={this.isSelected}
                                            handleSort={this.handleSort}
                                            sortBy={this.state.sortBy}
                                            sortDirection={this.state.sortDirection}
                                        />
                                        <UpdateApplicantsCard
                                            numSelected={this.state.selected.size}
                                            deleteMembers={this.deleteMembers}
                                            updateApplicants={this.updateApplicants}
                                        />
                                    </div>
                                )
                            }</div>

                    }
                </div>
            </div>
        )
    }
}

export default ManageApplicants;