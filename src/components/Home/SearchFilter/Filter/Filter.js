import React, { Component } from "react"
import "./Filter.css"
import FilterCard from "./FilterCard/FilterCard.js";
import filterImage from "./filter.png"

class Filter extends Component {
    constructor() {
        super();
        this.state = {
            showFilterCard: false,
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
            <div id="filter-flex-container">
                <button
                    id="home-filter-button"
                    onClick={this.toggleShowFilter}
                >
                    <img id="filter-icon" src={filterImage} alt="Filter icon" />
                </button>
                <div>
                    {this.state.showFilterCard ?
                        <FilterCard
                            toggleShowFilter={this.toggleShowFilter}
                            filters={this.props.filters}
                            handleFilter={this.props.handleFilter}
                        /> : null
                    }
                </div>
            </div>
        )
    }
}

export default Filter