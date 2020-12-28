import React, { Component } from "react";
import "./TableHeader.css"

import upArrow from "./Icons/up.png"
import downArrow from "./Icons/down.png"

class TableHeader extends Component {
    render() {
        const sortBy = this.props.sortBy
        const sortDirection = this.props.sortDirection

        return (
            // <thead id="table-header-grid-container">
            //     <tr id="table-header-row-grid-container">
            //         <th id="name-header" className="name-header-click-area" onClick={event => this.props.handleSort(event)}>
            //             <span className="column-header-span name-header-click-area" style={sortBy === "name" ? {fontWeight: "bold"} : null}>Name</span> 
            //             {sortBy === "name" ? 
            //             <img className="sort-arrow name-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}  
            //         </th>

            //         <th id="likes-header" className="likes-header-click-area" onClick={event => this.props.handleSort(event)}>
            //             <span className="column-header-span likes-header-click-area" style={sortBy === "likes" ? {fontWeight: "bold"} : null}>Likes</span>
            //             {sortBy === "likes" ? 
            //             <img className="sort-arrow likes-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null} 
            //         </th>

            //         <th id="comments-header" className="comments-header-click-area" onClick={event => this.props.handleSort(event)}>
            //             <span className="column-header-span comments-header-click-area" style={sortBy === "comments" ? {fontWeight: "bold"} : null}>Comments</span>
            //             {sortBy === "comments" ? 
            //             <img className="sort-arrow comments-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}                 
            //         </th>

            //         <th id="tags-header">Tags</th>
            //     </tr>
            // </thead>

            <thead id="member-table-header-grid-container">
                <tr id="member-table-header-row-grid-container">
                    <th id="member-select-header" onClick={event => this.props.selectAll(event)}>Select</th>
                    <th id="member-name-header" className="name-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="column-header-span name-header-click-area" style={sortBy === "name" ? {fontWeight: "bold"} : null}>Name</span> 
                        {sortBy === "name" ? 
                        <img className="sort-arrow name-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}  
                    </th>

                    <th id="member-email-header" className="email-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="column-header-span email-header-click-area" style={sortBy === "email" ? {fontWeight: "bold"} : null}>Email</span>
                        {sortBy === "email" ? 
                        <img className="sort-arrow email-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null} 
                    </th>

                    <th id="member-comments-header" className="comments-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="column-header-span comments-header-click-area" style={sortBy === "comments" ? {fontWeight: "bold"} : null}>Comments</span>
                        {sortBy === "comments" ? 
                        <img className="sort-arrow comments-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}                 
                    </th>

                    <th id="member-votes-header" className="votes-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="column-header-span votes-header-click-area" style={sortBy === "votes" ? {fontWeight: "bold"} : null}>Votes</span>
                        {sortBy === "votes" ? 
                        <img className="sort-arrow votes-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}                 
                    </th>
                    <th id="member-admin-header" className="admin-header-click-area" onClick={event => this.props.handleSort(event)}>
                        <span className="column-header-span admin-header-click-area" style={sortBy === "admin" ? {fontWeight: "bold"} : null}>Admin</span>
                        {sortBy === "admin" ? 
                        <img className="sort-arrow admin-header-click-area" src={sortDirection === "ascending" ? upArrow : downArrow} alt="Sort arrow" /> : null}                 
                    </th>
                </tr>
            </thead>
        )
    }
}

export default TableHeader