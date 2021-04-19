import React, { Component } from "react";
import FilterCard from "./FilterCard/FilterCard.js";
import filterImage from "./filter.png";
import Button from "@kiwicom/orbit-components/lib/Button";

import "./Filter.css";

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
            <div id="filter-flex-container" className="ignore-react-onclickoutside">
                <Button
                    type="secondary"
                    iconLeft={<img id="filter-icon" src={filterImage} alt="Filter icon" />}
                    onClick={this.toggleShowFilter}
                >
                    {/* <img id="filter-icon" src={filterImage} alt="Filter icon" /> */}
                </Button>
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

export default Filter;