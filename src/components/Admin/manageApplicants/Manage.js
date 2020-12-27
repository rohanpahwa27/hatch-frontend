import React, { Component } from "react"
import "./Manage.css"
import applicantData from "./ManageApplicantData.js"

import Table from "./Table/Table.js"
import TableToolbar from "./TableToolbar/TableToolbar.js"

class Manage extends Component {
    constructor() {
        super()
        this.state = {
            cycleOptions: [
                {value: 'fall-2017', label: 'Fall 2017', key: 'fall-2017'},
                {value: 'fall-2018', label: 'Fall 2018', key: 'fall-2018'},
            ],
            selectedOption: "",
            tableData: applicantData, 
            query: "", 
            numApplicantsShowing: applicantData.length,
            sortBy: "name",
            sortDirection: "descending"
        }

        this.handleCycleSelect = this.handleCycleSelect.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.sortByName = this.sortByName.bind(this)
        this.sortByLikes = this.sortByLikes.bind(this)
        this.sortByComments = this.sortByComments.bind(this)
    }

    componentDidMount() {
        this.sortByName(this.state.tableData, "ascending")
    }

    
    handleCycleSelect(event) {
        console.log(event)
        console.log(event.target.value)
        const cycleOption = event.target.value;
        this.setState({
            selectedOption: cycleOption
        })
        console.log(this.state)
    }

    handleSearch(event) {
        const queryText = event.target.value

        // filtering applicantData is the problem here
        const filteredApplicants = applicantData.filter(applicant => {
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
                  handleSort={this.handleSort} 
                  sortBy={this.state.sortBy} 
                  sortDirection={this.state.sortDirection}
                />
            </div>
        )
    }
}

export default Manage;