import React, { Component } from "react";
import "./TableHeader.css"

import upArrow from "./Icons/up.png"
import downArrow from "./Icons/down.png"

class TableHeader extends Component {
    render() {
        const sortBy = this.props.sortBy;
        const sortDirection = this.props.sortDirection;

        return (
            <thead>
                <tr id="applicant-table-header-row-grid-container">

                    <th id="applicant-select-header" onClick={event => this.props.selectAll(event)}>Select</th>

                    <th id="applicant-header" className="name-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="applicant-column-header-span name-header-click-area" style={sortBy === "name" ? {fontWeight: "bold"} : null}>Name</span> 
                        {sortBy === "name" ? 
                        <img className="sort-arrow name-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}  
                    </th>

                    <th id="applicant-header" className="likes-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="applicant-column-header-span likes-header-click-area" style={sortBy === "likes" ? {fontWeight: "bold"} : null}>Likes</span>
                        {sortBy === "likes" ? 
                        <img className="sort-arrow likes-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null} 
                    </th>

                    <th id="applicant-header" className="comments-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="applicant-column-header-span comments-header-click-area" style={sortBy === "comments" ? {fontWeight: "bold"} : null}>Comments</span>
                        {sortBy === "comments" ? 
                        <img className="sort-arrow comments-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}                 
                    </th>

                    <th id="applicant-header" className="dateAdded-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="applicant-column-header-span dateAdded-header-click-area" style={sortBy === "dateAdded" ? {fontWeight: "bold"} : null}>Date Added</span>
                        {sortBy === "dateAdded" ? 
                        <img className="sort-arrow dateAdded-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null} 
                    </th>

                    <th id="applicant-header" className="dateModified-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="applicant-column-header-span dateModified-header-click-area" style={sortBy === "dateModified" ? {fontWeight: "bold"} : null}>Date Modified</span>
                        {sortBy === "dateModified" ? 
                        <img className="sort-arrow dateModified-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null} 
                    </th>
                </tr>
            </thead>
        )
    }
}

export default TableHeader;