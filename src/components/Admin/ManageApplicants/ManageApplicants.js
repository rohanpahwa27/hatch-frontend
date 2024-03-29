import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./ManageApplicants.css";
import api from "../../../Api/api";
import Navbar from "../../Navbar/Navbar.js";
import {trackEvent} from "../../../tracking/utils"
// import ImportApplicants from "../ImportApplicants/ImportApplicants.js";
import Import from "../ImportApplicants/Import/Import.js";
import TableToolbar from "./TableToolbar/TableToolbar.js";
import Table from "./Table/Table.js";
import UpdateApplicantsCard from "./UpdateApplicantsCard/UpdateApplicantsCard.js";

import Logo from "../../Logo/Logo.js";
import SideNavBar from "../../SideNavBar/SideNavBar.js";

class ManageApplicants extends Component {
    constructor() {
        super();
        this.state = {
            allApplicants: null,
            organizationTags: {},
            tableData: [],
            query: "",
            filters: {
                status: new Set(["Active"]),
                tags: new Set()
            },
            selected: new Set(),
            numApplicantsShowing: 0,
            showImportPage: false,
            sortBy: "name",
            sortDirection: "descending"
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.sortByName = this.sortByName.bind(this);
        this.sortbyLikes = this.sortbyLikes.bind(this);
        this.sortbyComments = this.sortbyComments.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.handleFilter = this.handleFilter.bind(this)
        this.selectAll = this.selectAll.bind(this);
        this.handleGotoApplicant = this.handleGotoApplicant.bind(this);
        this.updateApplicants = this.updateApplicants.bind(this);
        this.deleteApplicants = this.deleteApplicants.bind(this);
        this.downloadApplicantsExcel = this.downloadApplicantsExcel.bind(this);
        this.toggleShowImport = this.toggleShowImport.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
    }

    componentDidMount = async () => {
        try {
            const orgId = localStorage.getItem("orgID");
            const applicantResponse = await api.getApplicantsInOrg(orgId);
            const organizationResponse = await api.getMyOrg();
            const applicantData = applicantResponse.data.applicants;
            const organizationTags = organizationResponse.data.organization.tags.reduce((map, tag) => {
                map[tag._id] = {
                    color: tag.color,
                    text: tag.text,
                }
                return map
            }, {});

            this.setState({
                allApplicants: applicantData,
                tableData: applicantData,
                numApplicantsShowing: applicantData.length,
                organizationTags: organizationTags
            });
        } catch (error) {

        }
        
        this.handleFilter(this.state.filters);
        this.sortByName(this.state.tableData, "ascending");
        {this.state.allApplicants.length === 0 ? this.toggleShowImport() : null};
    }

    handleFilter(updatedFilters) {
        const { allApplicants } = this.state;
        const filteredApplicants = allApplicants.filter(applicant => {
            const { status, tags } = applicant;
            // Check if status is good first
            let includeApplicant = updatedFilters.status.has(status);
            if (includeApplicant == false) {
                return false;
            };
            // Then check intersection of tags
            updatedFilters.tags.forEach(filter => {
                if (tags.includes(filter)) {
                    includeApplicant = true;
                }
                else {
                    includeApplicant = false;
                }
            });
            trackEvent('filter by applicant tags');
            return includeApplicant;
        });

        // TODO (DRY principle): Change code snippet below to call handleSearch once updated to not use 'event'
        // Need to run handleSearch again on filter results
        const updatedApplicants = filteredApplicants.filter(applicant => {
            const applicantFullName = applicant.firstName + " " + applicant.lastName
            return applicantFullName.toLowerCase().indexOf(this.state.query) > -1;
        })

        // TODO (DRY principle): Change code snippet below to call handleSort once updated to not use 'event'
        // Need to run handleSort again on filter & search results
        if (this.state.sortBy === "name") {
            this.sortByName(updatedApplicants, this.state.sortDirection)
        }
        else if (this.state.sortBy === "likes") {
            this.sortByLikes(updatedApplicants, this.state.sortDirection)
        }
        else if (this.state.sortBy === "comments") {
            this.sortByComments(updatedApplicants, this.state.sortDirection)
        }

        this.setState({
            tableData: updatedApplicants,
            numApplicantsShowing: updatedApplicants.length,
            filters: updatedFilters
        });
    }

    isSelected(applicantId) {
        return this.state.selected.has(applicantId);
    }

    handleSelected(applicantId) {
        const selected = this.state.selected;
        selected.has(applicantId) ? selected.delete(applicantId) : selected.add(applicantId);
        this.setState({ selected: selected });
        return;
    }

    selectAll() {
        if (this.state.selected.size == this.state.tableData.length) {
            this.setState({ selected: new Set() });
            return;
        }
        let selectAll = new Set();
        this.state.tableData.map((applicant) => {
            selectAll.add(applicant._id);
        })
        this.setState({ selected: selectAll });
    }

    handleSearch(event) {
        const queryText = event.target.value;
        const { allApplicants, filters } = this.state;

        // filtering applicantData is the problem here
        const filteredApplicants = allApplicants.filter(applicant => {
            const applicantFullName = applicant.firstName + " " + applicant.lastName;
            return applicantFullName.toLowerCase().indexOf(queryText.toLowerCase()) > -1;
        });
        trackEvent('search by applicant name');

        const updatedApplicants = filteredApplicants.filter(applicant => {
            const { status, tags } = applicant;
            // Check if status is good first
            let includeApplicant = filters.status.has(status);
            if (includeApplicant == false) {
                return false;
            }
            // Then check intersection of tags
            filters.tags.forEach(filter => {
                if (tags.includes(filter)) {
                    includeApplicant = true;
                }
                else {
                    includeApplicant = false;
                }
            })
            return includeApplicant;
        });

        this.setState({
            tableData: updatedApplicants,
            query: queryText,
            numApplicantsShowing: updatedApplicants.length
        })

        if (this.state.sortBy === "name") {
            this.sortByName(updatedApplicants, this.state.sortDirection);
        }
        else if (this.state.sortBy === "likes") {
            this.sortbyLikes(updatedApplicants, this.state.sortDirection);
        }
        else if (this.state.sortBy === "comments") {
            this.sortbyComments(updatedApplicants, this.state.sortDirection);
        }
    }

    handleSort(event) {
        const classNames = event.target.className;

        // if the name header is clicked
        if (classNames.indexOf("name") > -1) {
            let direction = "ascending";
            /* we only want to sort alphaetically in descending order 
            if the user was already sorting names alphabetically in ascending order.
            if the user was previously sorting by likes and comments and clicks
            on the names tab, then the default should be to sort in ascending order
            */
            if (this.state.sortBy === "name" && this.state.sortDirection === "ascending") {
                direction = "descending";
            }

            this.sortByName(this.state.tableData, direction);
        }

        // if the likes header is clicked
        else if (classNames.indexOf("likes") > -1) {
            let direction = "descending";
            if (this.state.sortBy === "likes" && this.state.sortDirection === "descending") {
                direction = "ascending";
            }
            this.sortbyLikes(this.state.tableData, direction);
        }
        // if the comments header is clicked
        else if (classNames.indexOf("comments") > -1) {
            let direction = "descending";
            if (this.state.sortBy === "comments" && this.state.sortDirection === "descending") {
                direction = "ascending";
            }
            this.sortbyComments(this.state.tableData, direction);
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

    sortbyLikes(applicantsArray, direction) {
        // clone array
        const tableDataCopy = applicantsArray

        // sort in ascending order
        if (direction === "ascending") {
            tableDataCopy.sort((a, b) => {
                if (a.likes.length < b.likes.length) {
                    return -1
                }
                else if (a.likes.length < b.likes.length) {
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
                if (a.likes.length > b.likes.length) {
                    return -1
                }
                else if (a.likes.length > b.likes.length) {
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
            sortBy: "likes"
        })
    }

    sortbyComments(applicantsArray, direction) {
        // clone array
        const tableDataCopy = applicantsArray;

        /* if sortDirection was ascending before click or the user was sorting by
        another variable, then we want to sort descending by comments 
        */
        if (direction === "ascending") {
            tableDataCopy.sort((a, b) => {

                if (a.comments.length < b.comments.length) {
                    return -1
                }
                else if (a.comments.length < b.comments.length) {
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
                if (a.comments.length > b.comments.length) {
                    return -1
                }
                else if (a.comments.length > b.comments.length) {
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
            sortBy: "comments"
        })
    }

    handleGotoApplicant(applicantId) {
        this.props.history.push({
            pathname: '/applicant',
            // TODO: Edit if we want to get rid of the actual applicant ID and want smtg else?
            search: applicantId,
            state: { id: applicantId }
        });
        trackEvent('go to applicant from admin')
    }

    downloadApplicantsExcel = async () => {
        await api.downloadApplicantsExcel();
    };

    updateApplicants = async (label) => {
        const resp = await api.updateApplicantStatus({
            updatedStatus: label,
            applicants: Array.from(this.state.selected)
        });
        const applicantData = resp.data.allApplicants;
        // this.setState({
        //     tableData: applicantData,
        // });
        this.setState({ selected: new Set() });
        // Can reload or reset state. However, with reset state we'll need to reapply sort/search/filters possibly?
        this.reloadPage();
        trackEvent('update applicant')
    }

    deleteApplicants = async () => {
        const resp = await api.removeManyApplicants({
            applicants: Array.from(this.state.selected)
        });
        const applicantData = resp.data.allApplicants;
        // this.setState({
        //     tableData: applicantData,
        // });
        this.setState({ selected: new Set() });
        // Can reload or reset state. However, with reset state we'll need to reapply sort/search/filters possibly?
        this.reloadPage();
        trackEvent('delete applicant')
    }

    toggleShowImport() {
        // May delete this function later if we want import to go to a separate page
        this.setState({
            showImportPage: !this.state.showImportPage            
        });
    }

    reloadPage() {
        this.props.history.go(0);
    }

    render() {
        return (
            <div id="page-grid-container">
                <Logo />
                <SideNavBar />
                <div id="navbar-content-grid-container">
                    <Navbar />
                    {this.state.allApplicants === null ?
                        <div>{this.state.allApplicants}</div>
                        :
                        <div>
                            {/* this.state.allApplicants.length === 0 */}
                            {this.state.showImportPage == true ?
                                <Import
                                    reloadPage={this.reloadPage}
                                    allApplicants={this.state.allApplicants}
                                />
                                :
                                (
                                    <div id="manage-applicant-grid-container">
                                        {/* Pass handleSort function down all the way to TableHeader */}
                                        <TableToolbar
                                            numApplicantsShowing={this.state.numApplicantsShowing}
                                            totalApplicants={this.state.allApplicants.length}
                                            query={this.state.query} handleSearch={this.handleSearch}
                                            filters={this.state.filters} allTags={this.state.organizationTags} handleFilter={this.handleFilter}
                                            downloadApplicantsExcel={this.downloadApplicantsExcel}
                                            toggleShowImport={this.toggleShowImport}
                                        />
                                        <Table
                                            data={this.state.tableData}
                                            allTags={this.state.organizationTags}
                                            handleSelected={this.handleSelected}
                                            selectAll={this.selectAll}
                                            isSelected={this.isSelected}
                                            handleSort={this.handleSort}
                                            sortBy={this.state.sortBy}
                                            sortDirection={this.state.sortDirection}
                                        />
                                        <UpdateApplicantsCard
                                            selected={this.state.selected}
                                            numSelected={this.state.selected.size}
                                            handleGotoApplicant={this.handleGotoApplicant}
                                            deleteApplicants={this.deleteApplicants}
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

export default withRouter(ManageApplicants);