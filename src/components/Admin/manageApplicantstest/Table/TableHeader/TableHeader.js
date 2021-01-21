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

                    <th id="applicant-name-header" className="name-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="applicant-column-header-span name-header-click-area" style={sortBy === "name" ? {fontWeight: "bold"} : null}>Name</span> 
                        {sortBy === "name" ? 
                        <img className="sort-arrow name-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}  
                    </th>

                    <th id="applicant-tags-header">Tags</th>

                    <th id="applicant-avgScore-header" className="avgScore-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="applicant-column-header-span avgScore-header-click-area" style={sortBy === "avgScore" ? {fontWeight: "bold"} : null}>Avg. score</span>
                        {sortBy === "avgScore" ? 
                        <img className="sort-arrow avgScore-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null} 
                    </th>

                    <th id="applicant-votes-header" className="votes-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="applicant-column-header-span votes-header-click-area" style={sortBy === "votes" ? {fontWeight: "bold"} : null}>Votes</span>
                        {sortBy === "votes" ? 
                        <img className="sort-arrow votes-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}                 
                    </th>
                </tr>
            </thead>
        )
    }
}

export default TableHeader;