import React, { Component } from "react"
import "./SearchFilter.css"
import Filter from "./Filter/Filter.js"
import SearchBar from "./SearchBar/SearchBar.js"

class SearchAndFilter extends Component {
    render() {
        return (
            <div id="search-filter-grid-item">
                <div id="search-filter-flex-container">
                    <SearchBar query={this.props.query} handleSearch={this.props.handleSearch} />
                    <Filter />
                    {/* Showing applicants
                        Filter
                        Search
                        Active recruiting cycle
                        Add guest
                        Download data
                    */}
                </div>
            </div>
        )
    }
}

export default SearchAndFilter