import React, { Component } from "react";
import "./TableHeader.css"

import upArrow from "./Icons/up.png"
import downArrow from "./Icons/down.png"

class TableHeader extends Component {
    render() {
        const sortBy = this.props.sortBy
        const sortDirection = this.props.sortDirection

        return (
            <tr id="table-header-grid-container">
                <th id="name-header" className="table-header name" onClick={event => this.props.handleSort(event)}>
                    <span className="name">Name</span> 
                    {sortBy === "name" ? 
                    <img className="sort-arrow name" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}  
                </th>

                <th id="likes-header" className="table-header likes" onClick={event => this.props.handleSort(event)}>
                    <span className="likes">Likes</span>
                    {sortBy === "likes" ? 
                    <img className="sort-arrow likes" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null} 
                </th>

                <th id="comments-header" className="table-header comments" onClick={event => this.props.handleSort(event)}>
                    <span className="comments">Comments</span>
                    {sortBy === "comments" ? 
                    <img className="sort-arrow comments" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}                 </th>

                <th id="tags-header" className="table-header">Tags</th>
            </tr>
        )
    }
}

export default TableHeader