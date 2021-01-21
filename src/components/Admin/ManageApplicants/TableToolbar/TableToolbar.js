import React, { Component } from "react"
import "./TableToolbar.css"
import ShowingApplicantsLabel from "./ShowingApplicantsLabel/ShowingApplicantsLabel.js.js"
import Filter from "./Filter/Filter.js.js"
import SearchBar from "./SearchBar/SearchBar.js.js"
import SelectCycleDropdown from "./SelectCycleDropdown/SelectCycleDropdown.js.js"
import AddApplicant from "./AddApplicant/AddApplicant.js.js"
import Download from "./Download/Download.js.js"

class TableToolbar extends Component {
    render() {
        return (
            <div id="table-toolbar-grid-item">
                {/* 
                    Showing applicants
                    Filter
                    Search
                    Active recruiting cycle
                    Add guest
                    Download data
                */}
                <ShowingApplicantsLabel numApplicantsShowing={this.props.numApplicantsShowing} totalApplicants={this.props.totalApplicants} />
                <Filter />
                <SearchBar query={this.props.query} handleSearch={this.props.handleSearch} />
                <div style={{flexGrow: 1}}></div>
                <SelectCycleDropdown
                    cycleOptions={this.props.cycleOptions}
                    selectedOption={this.props.selectedOption}
                    handleCycleSelect={this.props.handleCycleSelect}
                />
                <AddApplicant />
                <Download />
            </div>
        )
    }
}

export default TableToolbar;
