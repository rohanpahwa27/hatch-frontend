import React, { Component } from "react"
import "./SearchBar.css"
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Search from "@kiwicom/orbit-components/lib/icons/Search";

class SearchBar extends Component {
    render() {
        return (
            <div id="search-bar-flex-container">
                <InputField id="search-bar" prefix={<Search />} type="text" placeholder="Search applicants" value={this.props.query} onChange={event => this.props.handleSearch(event)} />
            </div>
        )
    }
}

export default SearchBar