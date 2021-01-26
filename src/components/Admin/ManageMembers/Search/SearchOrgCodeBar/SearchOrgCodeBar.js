import React, { Component } from "react"
import "./SearchOrgCodeBar.css"
import { Link } from "react-router-dom";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Search from "@kiwicom/orbit-components/lib/icons/Search";

class SearchBar extends Component {
    render() {
        const showingAllMembers = this.props.numMembersShowing === this.props.totalMembers ? <div className = "member-search-container-text"><span>Showing all members ({this.props.totalMembers})</span></div>
        : <div className = "member-search-container-text"><span>Showing {this.props.numMembersShowing} of {this.props.totalMembers} members</span></div>
        return (
            <div id="member-search-flex-container">
                {showingAllMembers}
                <div>
                    <InputField id="member-search-bar" prefix={<Search />} type="text" placeholder="Search applicants" value={this.props.query} onChange={event => this.props.handleSearch(event)} />
                </div>
                <div className = "member-search-container-text"><span>Your add code for members: {this.props.orgCode}&emsp;</span> 
                <Link id="generateOrgCodeAdminSectionMember" onClick={this.props.generateOrgCode}>generate new org code</Link></div>
            </div>
        )
    }
}

export default SearchBar