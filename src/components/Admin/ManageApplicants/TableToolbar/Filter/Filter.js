import React, { Component } from "react";
import "./Filter.css";
import FilterCard from "./FilterCard/FilterCard.js";
import filterImage from "./filter.png";

class Filter extends Component {
    constructor() {
        super();
        this.state = {
            showFilterCard: true,
        }
    }
    
    // Declaring it as such binds the function automatically; don't need this.toggleShowFilter = this.toggleShowFilter.bind(this)
    toggleShowFilter = () => {
        this.setState({
            showFilterCard: !this.state.showFilterCard            
        });
    }

    render() {
        return (
            <div id="applicant-toolbar-filter-flex-container">
                <button
                    id="applicant-toolbar-filter-button"
                    onClick={this.toggleShowFilter}
                >
                    <img id="applicant-toolbar-filter-icon" src={filterImage} alt="Filter icon" />
                </button>
                <div>
                    {this.state.showFilterCard ?
                        <FilterCard
                            toggleShowFilter={this.toggleShowFilter}
                            filters={this.props.filters}
                            allTags={this.props.allTags}
                            handleFilter={this.props.handleFilter}
                        /> : null
                    }
                </div>
            </div>
        )
    }
}

export default Filter