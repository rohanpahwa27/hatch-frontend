import React, { Component } from "react"
import "./Home.css"

import Table from "./Table/Table.js"
import Logo from "./Logo/Logo.js"
import SideNavBar from "./SideNavBar/SideNavBar.js"
import SearchAndFilter from "./SearchFilter/SearchFilter.js"
import ShowingApplicantsLabel from "./ShowingApplicantsLabel/ShowingApplicantsLabel.js"

import api from "../../Api/api"

class Home extends Component {
    constructor() {
        super()
        // allApplicants is all of the applicants in the organization
        // tableData is only the applicants currently showing in the table
        this.state = {
            allApplicants: [],
            tableData: [],
            query: "",
            filters: new Set(["Active"]),
            numApplicantsShowing: 0,
            sortBy: "name",
            sortDirection: "descending"
        }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.sortByName = this.sortByName.bind(this)
        this.sortByLikes = this.sortByLikes.bind(this)
        this.sortByComments = this.sortByComments.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
    }

    componentDidMount() {
        const orgId = localStorage.getItem("orgID");
        api.getApplicantsInOrg(orgId)
            .then(res => {
                const applicants = res.data.applicants.map(applicant => {
                    const applicantInfo = {
                        firstName: applicant.firstName,
                        lastName: applicant.lastName,
                        email: applicant.email,
                        likes: Math.floor(Math.random() * 50),
                        comments: Math.floor(Math.random() * 20),
                        extraFields: applicant.extraFields,
                        status: applicant.status,
                        recruitingCycle: applicant.recruitingCycle,
                        organization: applicant.organization,
                        imgURL: "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"
                    }
                    return applicantInfo
                })

                this.setState({
                    allApplicants: applicants,
                    tableData: applicants,
                    numApplicantsShowing: applicants.length
                })

                this.handleFilter(this.state.filters);
                this.sortByName(this.state.tableData, "ascending");
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleFilter(updatedFilters) {
        const { allApplicants } = this.state;
        const filteredApplicants = allApplicants.filter(applicant => {
            const { status } = applicant;
            return updatedFilters.has(status);
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

    handleSearch(event) {
        const queryText = event.target.value

        const filteredApplicants = this.state.allApplicants.filter(applicant => {
            const applicantFullName = applicant.firstName + " " + applicant.lastName
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
            this.sortByName(filteredApplicants, this.state.sortDirection)
        }
        else if (this.state.sortBy === "likes") {
            this.sortByLikes(filteredApplicants, this.state.sortDirection)
        }
        else if (this.state.sortBy === "comments") {
            this.sortByComments(filteredApplicants, this.state.sortDirection)
        }
    }

    handleSort(event) {
        const classNames = event.target.className

        // if the name header is clicked
        if (classNames.indexOf("name") > -1) {

            let direction = "ascending"

            /* we only want to sort alphaetically in descending order 
            if the user was already sorting names alphabetically in ascending order.
            if the user was previously sorting by likes and comments and clicks
            on the names tab, then the default should be to sort in ascending order
            */
            if (this.state.sortBy === "name" && this.state.sortDirection === "ascending") {
                direction = "descending"
            }

            this.sortByName(this.state.tableData, direction)
        }

        // if the likes header is clicked
        else if (classNames.indexOf("likes") > -1) {
            let direction = "descending"

            if (this.state.sortBy === "likes" && this.state.sortDirection === "descending") {
                direction = "ascending"
            }

            this.sortByLikes(this.state.tableData, direction)
        }
        // if the comments header is clicked
        else if (classNames.indexOf("comments") > -1) {
            let direction = "descending"

            if (this.state.sortBy === "comments" && this.state.sortDirection === "descending") {
                direction = "ascending"
            }

            this.sortByComments(this.state.tableData, direction)
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

    sortByLikes(applicantsArray, direction) {
        // clone array
        const tableDataCopy = applicantsArray

        // sort in ascending order
        if (direction === "ascending") {
            tableDataCopy.sort((a, b) => {
                if (a.likes < b.likes) {
                    return -1
                }
                else if (a.likes < b.likes) {
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
                if (a.likes > b.likes) {
                    return -1
                }
                else if (a.likes > b.likes) {
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

    sortByComments(applicantsArray, direction) {
        // clone array
        const tableDataCopy = applicantsArray

        /* if sortDirection was ascending before click or the user was sorting by
        another variable, then we want to sort descending by likes 
        */
        if (direction === "ascending") {
            tableDataCopy.sort((a, b) => {

                if (a.comments < b.comments) {
                    return -1
                }
                else if (a.comments < b.comments) {
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
                if (a.comments > b.comments) {
                    return -1
                }
                else if (a.comments > b.comments) {
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

    render() {
        return (
            <div id="home-grid-container">
                <Logo />
                <SearchAndFilter
                    query={this.state.query} handleSearch={this.handleSearch}
                    filters={this.state.filters} handleFilter={this.handleFilter}
                />

                <ShowingApplicantsLabel numApplicantsShowing={this.state.numApplicantsShowing} totalApplicants={this.state.allApplicants.length} />

                <SideNavBar />

                {/* Pass handleSort function down all the way to TableHeader */}
                <Table data={this.state.tableData} handleSort={this.handleSort} sortBy={this.state.sortBy} sortDirection={this.state.sortDirection} />
            </div>
        )
    }
}

export default Home