import React, { Component } from "react"
import "./SearchBar.css"
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Search from "@kiwicom/orbit-components/lib/icons/Search";

class SearchBar extends Component {
    render() {
        return (
            <div id="member-search-bar-flex-container">
                <div className="row">
                    <div className="column">
                        <span>HELLOOOOOO</span>
                    </div>
                    <div className="column">
                        <InputField id="member-search-bar" prefix={<Search />} type="text" placeholder="Search applicants" value={this.props.query} onChange={event => this.props.handleSearch(event)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar