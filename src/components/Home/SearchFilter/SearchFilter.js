import React, { Component } from "react"
import "./SearchFilter.css"
import Filter from "../../Filter/Filter.js";
import SearchBar from "./SearchBar/SearchBar.js"

class SearchAndFilter extends Component {
    render() {
        return (
            <div id="search-filter-grid-item">
                <div id="search-filter-flex-container">
                    <SearchBar query={this.props.query} handleSearch={this.props.handleSearch} />
                    <Filter filters={this.props.filters} allTags={this.props.allTags} handleFilter={this.props.handleFilter}/>
                </div>
            </div>
        )
    }
}

export default SearchAndFilter