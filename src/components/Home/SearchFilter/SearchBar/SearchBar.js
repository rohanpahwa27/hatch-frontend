import React, { Component } from "react"
import "./SearchBar.css"
import searchImage from "./Icons/search.png"

class SearchBar extends Component {
    render() {
        return (
            <div id="search-bar-flex-container">
                <img id="search-icon" src={searchImage} alt="Search" />
                <input id="search-bar-textbox" type="text" placeholder="search applicants" value={this.props.query} onChange={event => this.props.handleSearch(event)} />
            </div>
        )
    }
}

export default SearchBar