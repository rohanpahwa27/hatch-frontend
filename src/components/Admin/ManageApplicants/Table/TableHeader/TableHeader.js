import React, { Component } from "react";
import "./TableHeader.css"

import upArrow from "./Icons/up.png"
import downArrow from "./Icons/down.png"

class TableHeader extends Component {
    render() {
        const sortBy = this.props.sortBy;
        const sortDirection = this.props.sortDirection;

        return (
            <thead id="applicant-table-header-grid-container">
                <tr id="applicant-table-header-row-grid-container">

                    <th id="applicant-select-header" onClick={event => this.props.selectAll(event)}>Select</th>

                    <th id="applicant-header" onClick={event => this.props.handleSort(event)}>
                        <span style={sortBy === "name" ? {fontWeight: "bold"} : null}>Name</span> 
                        {sortBy === "name" ? 
                        <img className="sort-arrow" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}  
                    </th>

                    {/* <th id="applicant-tags-header">Tags</th> */}
                    {/* 
                        likes, 
                        comments, 
                        date added, 
                        last modified 
                    */}

                    <th id="applicant-header" onClick={event => this.props.handleSort(event)}>
                        <span style={sortBy === "likes" ? {fontWeight: "bold"} : null}>Likes</span>
                        {sortBy === "likes" ? 
                        <img className="sort-arrow" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null} 
                    </th>

                    <th id="applicant-header" onClick={event => this.props.handleSort(event)}>
                        <span style={sortBy === "comments" ? {fontWeight: "bold"} : null}>Comments</span>
                        {sortBy === "comments" ? 
                        <img className="sort-arrow" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null} 
                    </th>

                    <th id="applicant-header" onClick={event => this.props.handleSort(event)}>
                        <span style={sortBy === "dateAdded" ? {fontWeight: "bold"} : null}>Date Added</span>
                        {sortBy === "dateAdded" ? 
                        <img className="sort-arrow" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null} 
                    </th>

                    <th id="applicant-header" onClick={event => this.props.handleSort(event)}>
                        <span style={sortBy === "dateModified" ? {fontWeight: "bold"} : null}>Date Modified</span>
                        {sortBy === "dateModified" ? 
                        <img className="sort-arrow" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null} 
                    </th>
                </tr>
            </thead>
        )
    }
}

export default TableHeader;