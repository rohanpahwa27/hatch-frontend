import React, { Component } from "react"
import "./Search.css"
import SearchBar from "./SearchBar/SearchBar.js"

class SearchAndFilter extends Component {
    render() {
        return (
            <div id="member-search-grid-item">
                <div id="member-search-flex-container">
                    <SearchBar query={this.props.query} handleSearch={this.props.handleSearch} />
                </div>
            </div>
        )
    }
}

export default SearchAndFilter