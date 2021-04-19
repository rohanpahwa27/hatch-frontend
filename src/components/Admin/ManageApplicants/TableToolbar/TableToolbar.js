import React, { Component } from "react";
import "./TableToolbar.css";
import ShowingApplicantsLabel from "./ShowingApplicantsLabel/ShowingApplicantsLabel.js";
import Filter from "../../../Filter/Filter.js";
import SearchBar from "./SearchBar/SearchBar.js";
import AddApplicant from "./AddApplicant/AddApplicant.js";
import Download from "./Download/Download.js";

class TableToolbar extends Component {
    render() {
        return (
            <div id="table-toolbar-grid-item">
                <ShowingApplicantsLabel numApplicantsShowing={this.props.numApplicantsShowing} totalApplicants={this.props.totalApplicants} />
                <Filter filters={this.props.filters} allTags={this.props.allTags} handleFilter={this.props.handleFilter} />
                <SearchBar query={this.props.query} handleSearch={this.props.handleSearch} />
                {/* <div style={{flexGrow: 1}}></div> */}
                {/* <Download downloadApplicantsExcel={this.props.downloadApplicantsExcel}/> */}
                <AddApplicant toggleShowImport={this.props.toggleShowImport}/>
            </div>
        )
    }
}

export default TableToolbar;
