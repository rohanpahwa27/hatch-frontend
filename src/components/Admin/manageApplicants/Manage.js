import React, { Component } from "react";
import "./Manage.css";
import applicantData from "./ManageApplicantData.js";
import Navbar from "../../Navbar/Navbar.js";

import TableToolbar from "./TableToolbar/TableToolbar.js";
import Table from "./Table/Table.js";
import UpdateApplicantsCard from "./UpdateApplicantsCard/UpdateApplicantsCard.js";

class Manage extends Component {
    constructor() {
        super();
        this.state = {
            cycleOptions: [
                { value: 'fall-2017', label: 'Fall 2017', key: 'fall-2017' },
                { value: 'fall-2018', label: 'Fall 2018', key: 'fall-2018' },
            ],
            selectedOption: "",
            tableData: applicantData,
            query: "",
            selected: new Set(),
            numApplicantsShowing: applicantData.length,
            sortBy: "name",
            sortDirection: "descending"
        };

        this.handleCycleSelect = this.handleCycleSelect.bind(this);
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

    componentDidMount() {
        this.sortByName(this.state.tableData, "ascending");
    }


    isSelected(applicantId) {
        console.log('ISSELECTED', this.state.selected.has(applicantId));
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
        let selectAll = new Set();
        this.state.tableData.map((member) => {
            selectAll.add(member.objectID);
        })
        this.setState({ selected: selectAll });
    }

    handleCycleSelect(event) {
        const cycleOption = event.target.value;
        this.setState({
            selectedOption: cycleOption
        })
    }

    handleSearch(event) {
        const queryText = event.target.value;

        // filtering applicantData is the problem here
        const filteredApplicants = applicantData.filter(applicant => {
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
            <div id="navbar-content-grid-container">
                <Navbar />
                <div id="manage-applicant-grid-container">
                    {/* Pass handleSort function down all the way to TableHeader */}
                    <TableToolbar
                        cycleOptions={this.state.cycleOptions}
                        selectedOption={this.state.selectedOption}
                        handleCycleSelect={this.handleCycleSelect}
                        numApplicantsShowing={this.state.numApplicantsShowing}
                        totalApplicants={applicantData.length}
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
            </div>
        )
    }
}

export default Manage;