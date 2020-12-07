import React, { Component } from "react";
import "./TableHeader.css"

class TableHeader extends Component {
    render() {
        return (
            <div id="table-header-grid-container">
                <div id="name-header" className="table-header">
                    <span class="table-header-text">Name</span>
                </div>
                <div id="likes-header" className="table-header">
                    <span class="table-header-text">Likes</span>
                </div>
                <div id="comments-header" className="table-header"> 
                    <span class="table-header-text">Comments</span>
                </div>
                <div id="tags-header-grid-item" className="table-header"> 
                    <span class="table-header-text">Tags</span>
                </div>
            </div>
        )
    }
}

export default TableHeader