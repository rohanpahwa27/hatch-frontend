import React, { Component } from "react";
import "./TableHeader.css"

import upArrow from "./Icons/up.png"
import downArrow from "./Icons/down.png"

class TableHeader extends Component {
    render() {
        const sortBy = this.props.sortBy
        const sortDirection = this.props.sortDirection

        return (
            <thead id="table-header-grid-container">
                <tr id="table-header-row-grid-container">
                    <th id="name-header" className="name-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="column-header-span name-header-click-area" style={sortBy === "name" ? {fontWeight: "bold"} : null}>Name</span> 
                        {sortBy === "name" ? 
                        <img className="sort-arrow name-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}  
                    </th>

                    <th id="likes-header" className="likes-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="column-header-span likes-header-click-area" style={sortBy === "likes" ? {fontWeight: "bold"} : null}>Likes</span>
                        {sortBy === "likes" ? 
                        <img className="sort-arrow likes-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null} 
                    </th>

                    <th id="comments-header" className="comments-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="column-header-span comments-header-click-area" style={sortBy === "comments" ? {fontWeight: "bold"} : null}>Comments</span>
                        {sortBy === "comments" ? 
                        <img className="sort-arrow comments-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}                 
                    </th>
                </tr>
            </thead>
        )
    }
}

export default TableHeader