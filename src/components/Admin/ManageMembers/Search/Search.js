import React, { Component } from "react"
import "./Search.css"
import SearchOrgCodeBar from "./SearchOrgCodeBar/SearchOrgCodeBar.js"

class SearchAndFilter extends Component {
    render() {
        return (
            <div id="member-search-grid-item">
                    <SearchOrgCodeBar query={this.props.query} handleSearch={this.props.handleSearch} numMembersShowing={this.props.numMembersShowing} totalMembers={this.props.totalMembers} orgCode={this.props.orgCode} generateOrgCode={this.props.generateOrgCode}/>
            </div>
        )
    }
}

export default SearchAndFilter