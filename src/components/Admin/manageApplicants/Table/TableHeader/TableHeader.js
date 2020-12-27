import React, { Component } from "react";
import "./TableHeader.css"

import upArrow from "./Icons/up.png"
import downArrow from "./Icons/down.png"

class TableHeader extends Component {
    render() {
        const sortBy = this.props.sortBy
        const sortDirection = this.props.sortDirection

        return (
            <thead id="table-header-manage-grid-container">
                <tr id="table-header-manage-row-grid-container">

                    <th id="select-header-manage">Select</th>

                    <th id="name-header-manage" className="name-header-manage-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="column-header-manage-span name-header-manage-click-area" style={sortBy === "name" ? {fontWeight: "bold"} : null}>Name</span> 
                        {sortBy === "name" ? 
                        <img className="sort-arrow name-header-manage-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}  
                    </th>

                    <th id="tags-header-manage">Tags</th>

                    <th id="likes-header-manage" className="likes-header-manage-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="column-header-manage-span likes-header-manage-click-area" style={sortBy === "score" ? {fontWeight: "bold"} : null}>Avg. score</span>
                        {sortBy === "score" ? 
                        <img className="sort-arrow likes-header-manage-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null} 
                    </th>

                    <th id="comments-header-manage" className="comments-header-manage-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="column-header-manage-span comments-header-manage-click-area" style={sortBy === "votes" ? {fontWeight: "bold"} : null}>Votes</span>
                        {sortBy === "votes" ? 
                        <img className="sort-arrow comments-header-manage-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}                 
                    </th>
                </tr>
            </thead>
        )
    }
}

export default TableHeader