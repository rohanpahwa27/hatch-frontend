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
        this.state = {
            tableData: applicantData, 
            query: "", 
            numApplicantsShowing: applicantData.length,
            sortBy: "name",
            sortDirection: "ascending"
        }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleSort = this.handleSort.bind(this)
    }

    handleSearch(event) {
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

    handleSort(event) {
        const classNames = event.target.className
        
        // if the name header is clicked
        if (classNames.indexOf("name") > -1) {     
            this.sortByName()
        }        

        // if the name likes header is clicked
        else if (classNames.indexOf("like") > -1) {
            this.sortByLikes()
        }
        else if (classNames.indexOf("comment") > -1) {
            this.sortByComments()
        }
    }

    sortByName() {
        // clone array
        const tableDataCopy = [...this.state.tableData]

        /* if sortDirection was descending before click or the user was sorting by
        another variable, then we want to sort ascending by name
        */
        if (this.state.sortDirection === "descending" || this.state.sortBy !== "name") {
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
        // if sortDirection was ascending before click, change to ascending
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

    sortByLikes() {
       // clone array
       const tableDataCopy = [...this.state.tableData]

       /* if sortDirection was ascending before click or the user was sorting by
       another variable, then we want to sort descending by likes 
       */
       if (this.state.sortDirection === "ascending" || this.state.sortBy !== "likes") {
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
       else {
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

       // update data we pass down to the table to the sorted data
       this.setState({
           tableData: tableDataCopy,
           sortBy: "likes"
       }) 
    }

    sortByComments() {
        // clone array
        const tableDataCopy = [...this.state.tableData]
 
        /* if sortDirection was ascending before click or the user was sorting by
        another variable, then we want to sort descending by likes 
        */
        if (this.state.sortDirection === "ascending" || this.state.sortBy !== "comments") {
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
        else {
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
                <SearchAndFilter query={this.state.query} handleSearch={this.handleSearch} />
            
                <ShowingApplicantsLabel numApplicantsShowing={this.state.numApplicantsShowing} totalApplicants={applicantData.length} />

                <SideNavBar />

                {/* Pass handleSort function down all the way to TableHeader */}
                <Table data={this.state.tableData} handleSort={this.handleSort} sortBy={this.state.sortBy} sortDirection={this.state.sortDirection} />
            </div>
        )
    }
}

export default Home