import React, { Component } from "react";
import "./TableHeader.css"

class TableHeader extends Component {
    render() {
        return (
            <tr id="table-header-grid-container">
                <th id="name-header" className="table-header">Name</th>
                <th id="likes-header" className="table-header">Likes</th>
                <th id="comments-header" className="table-header">Comments</th>
                <th id="tags-header" className="table-header">Tags</th>
            </tr>
        )
    }
}

export default TableHeader