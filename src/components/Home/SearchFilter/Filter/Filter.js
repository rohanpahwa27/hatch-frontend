import React, { Component } from "react"
import "./Filter.css"
import FilterCard from "./FilterCard/FilterCard.js";
import filterImage from "./filter.png"

class Filter extends Component {
    constructor() {
        super();
        this.state = {
            showFilter: false,
            updatedFilters: []
        }
    }

    toggleShowFilter = () => {
        // Declaring it like above binds the function automatically; don't need this.toggleShowFilter = this.toggleShowFilter.bind(this)
        this.setState({
            showFilter: true
            // showFilter: !this.state.showFilter            
        });
    }

    render() {
        return (
            <div id="filter-flex-container">
                <button
                    id="home-filter-button"
                    onClick={this.toggleShowFilter}
                >
                    <img id="filter-icon" src={filterImage} alt="Filter icon" />
                </button>
                <div>
                    {this.state.showFilter ?
                        <FilterCard /> : null
                    }
                </div>
            </div>
        )
    }
}

export default Filter