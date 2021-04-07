import React, { Component } from "react"
import "./ManageMembers.css"
import Table from "./Table/Table"
import UpdateMembersCard from "./UpdateMembersCard/UpdateMembersCard"
import Navbar from "../../Navbar/Navbar"
import Search from "./Search/Search"
import api from "../../../Api/api"
import Logo from "../../Logo/Logo";
import SideNavBar from "../../SideNavBar/SideNavBar";
import EmptyState from "./EmptyState"

var memberData = []
class ManageMembers extends Component {
    constructor() {
        super()
        this.state = {
            showEmptyState: null,
            tableData: memberData, 
            query: "",
            selected: new Set(),
            numMembersShowing: memberData.length,
            sortBy: "name",
            sortDirection: "descending",
            orgCode: ""
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleSelected = this.handleSelected.bind(this)
        this.deleteMembers = this.deleteMembers.bind(this)
        this.isSelected = this.isSelected.bind(this)
        this.updateMembers = this.updateMembers.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.sortByName = this.sortByName.bind(this)
        this.sortByVotes = this.sortByVotes.bind(this)
        this.sortByComments = this.sortByComments.bind(this)
        this.sortByEmail = this.sortByEmail.bind(this)
        this.sortByAdmin = this.sortByAdmin.bind(this)
        this.selectAll = this.selectAll.bind(this)
        this.generateOrgCode = this.generateOrgCode.bind(this)
    }

    componentDidMount = async () => {
        try {
            const memberResponse = await api.getMembersInOrg();
            memberData = memberResponse.data.members

            const userResp = await api.getThisMember();
            let userID = userResp.data.member._id
            const index = memberData.map(function(e) { return e._id; }).indexOf(userID);
            if (index > -1) memberData.splice(index, 1);
            const organizationResponse = await api.getMyOrg()
            const orgCode = organizationResponse.data.organization.addCode
            this.setState({tableData: memberData, totalMembers: memberData.length, orgCode: orgCode, numMembersShowing: memberData.length, showEmptyState: memberData.length==0})
        } catch (error) {
            console.log(error)
        }
        
        this.sortByName(this.state.tableData, "ascending")
    }

    generateOrgCode = async () => {
        api.generateOrgCode().then(res => {
            this.setState({orgCode: res.data.code})
        }).catch(err => {
            console.log(err)
        })
    }

    isSelected(memberID){
        return this.state.selected.has(memberID)
    }

    handleSelected(memberID){
        const selected = this.state.selected
        selected.has(memberID) ? selected.delete(memberID): selected.add(memberID);
        this.setState({ selected: selected});
        return;
    }

    handleSearch(event) {
        const queryText = event.target.value
        const filteredMembers = memberData.filter(member => {
            const memberFullName = member.firstName + " " + member.lastName
            return memberFullName.toLowerCase().indexOf(queryText.toLowerCase()) > -1;
        })

        this.setState({
            tableData: filteredMembers,
            query: queryText,
            numMembersShowing: filteredMembers.length
        })

        if (this.state.sortBy === "name") {
            this.sortByName(filteredMembers, this.state.sortDirection)
        } else if (this.state.sortBy === "votes") {
            this.sortByVotes(filteredMembers, this.state.sortDirection)
        } else if (this.state.sortBy === "comments") {
            this.sortByComments(filteredMembers, this.state.sortDirection)
        } else if (this.state.sortBy === 'admin'){
            this.sortByAdmin(filteredMembers, this.state.sortDirection)
        } else if (this.state.sortBy === 'email'){
            this.sortByEmail(filteredMembers, this.state.sortDirection)
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
        else if (classNames.indexOf("votes") > -1) {            
            let direction = "descending"
            if (this.state.sortBy === "votes" && this.state.sortDirection === "descending") {
                direction = "ascending"
            }
            this.sortByVotes(this.state.tableData, direction)
        }
        // if the comments header is clicked
        else if (classNames.indexOf("comments") > -1) {
            let direction = "descending"
            if (this.state.sortBy === "comments" && this.state.sortDirection === "descending") {
                direction = "ascending"
            }
            this.sortByComments(this.state.tableData, direction)
        }
        else if (classNames.indexOf("email") > -1) {
            let direction = "descending"
            if (this.state.sortBy === "email" && this.state.sortDirection === "descending") {
                direction = "ascending"
            }
            this.sortByEmail(this.state.tableData, direction)
        }
        else if (classNames.indexOf("admin") > -1) {
            let direction = "descending"
            if (this.state.sortBy === "admin" && this.state.sortDirection === "descending") {
                direction = "ascending"
            }
            this.sortByAdmin(this.state.tableData, direction)
        }
    }

    sortByName(membersArray, direction) {
        /* need to make a copy because if the caller of the function passes
        in this.state.tableData, we don't want to change the contents of that array */
        const tableDataCopy = membersArray

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
        this.setState({
            tableData: tableDataCopy,
            sortBy: "name"
        })
    }

    sortByVotes(membersArray, direction) {
       const tableDataCopy = membersArray
       // sort in ascending order
        if (direction === "ascending") {
            tableDataCopy.sort((a, b) => {
                if (a.votes < b.votes) {
                    return -1
                }
                else if (b.votes < a.votes) {
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
                if (a.votes > b.votes) {
                    return -1
                }
                else if (b.votes > a.votes) {
                    return 1
                }
                return 0
            })
            this.setState({
                sortDirection: "descending"
            }) 
        }
       this.setState({
           tableData: tableDataCopy,
           sortBy: "votes"
       }) 
    }

    sortByEmail(membersArray, direction) {
        const tableDataCopy = membersArray
        if (direction === "ascending") {
            tableDataCopy.sort((a, b) => {
                if (a.email < b.email) {
                    return -1
                }
                else if (b.email < a.email) {
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
                if (a.email > b.email) {
                    return -1
                }
                else if (b.email > a.email) {
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
            sortBy: "email"
        }) 
     }

     selectAll(){
        if (this.state.selected.size === this.state.tableData.length){
            this.setState({selected: new Set()});
            return;
        }
        let selectAll = new Set();
        this.state.tableData.map((member) => {
            return selectAll.add(member._id)
        })
        this.setState({selected: selectAll})
     }

     sortByAdmin(membersArray, direction) {
        const tableDataCopy = membersArray
        if (direction === "ascending") {
            tableDataCopy.sort((a, b) => {
                if (a.admin !== b.admin) {
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
                if (a.admin !== b.admin) {
                    return -1
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
            sortBy: "admin"
        }) 
     }

    sortByComments(membersArray, direction) {
        const tableDataCopy = membersArray
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

    updateMembers = async (label) => {
        const resp = await api.updateMemberStatus({updatedStatus: label.toLowerCase(), members: Array.from(this.state.selected)})
        let memberData = resp.data.allMembers
        const userID = resp.data.user._id
        const index = memberData.map(function(e) { return e._id; }).indexOf(userID);
        if (index > -1) memberData.splice(index, 1);
        this.setState({tableData: memberData, totalMembers: memberData.length, showEmptyState: memberData.length==0})
        this.setState({selected: new Set()})
    }

    deleteMembers = async () => {
        const resp = await api.removeManyMembers({members: Array.from(this.state.selected)})
        let memberData = resp.data.allMembers
        const userID = resp.data.user._id
        const index = memberData.map(function(e) { return e._id; }).indexOf(userID);
        if (index > -1) memberData.splice(index, 1);
        this.setState({tableData: memberData, totalMembers: memberData.length, showEmptyState: memberData.length==0})
        this.setState({selected: new Set()})
    }

    render() {
        console.log('Show Empty State:', this.state.showEmptyState, 'length=0', this.state.tableData.length==0)
        console.log('Show Empty State:', this.state.showEmptyState)
        return (
            <div id="page-grid-container">
                <Logo />
                <SideNavBar />
                <div id="navbar-content-grid-container">
                    <Navbar/>
                    {this.state.showEmptyState == null ? null: (this.state.showEmptyState ? <EmptyState orgCode={this.state.orgCode} generateOrgCode={this.generateOrgCode}/> : (
                        <div id="manage-members-grid-container">
                            <Search query={this.state.query} handleSearch={this.handleSearch} numMembersShowing={this.state.numMembersShowing} totalMembers={memberData.length} orgCode={this.state.orgCode} generateOrgCode={this.generateOrgCode}/>
                            <Table data={this.state.tableData} handleSelected={this.handleSelected} isSelected={this.isSelected} handleSort={this.handleSort} selectAll={this.selectAll} sortBy={this.state.sortBy} sortDirection={this.state.sortDirection} />
                            <UpdateMembersCard numSelected={this.state.selected.size} deleteMembers={this.deleteMembers} updateMembers={this.updateMembers}/>
                        </div>))}
                </div>
            </div>
            
        )
    }
}

export default ManageMembers