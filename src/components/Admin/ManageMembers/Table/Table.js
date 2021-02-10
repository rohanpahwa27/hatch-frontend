import React, { Component } from "react";
import "./Table.css"

import TableHeader from "./TableHeader/TableHeader.js"
import TableBody from "./TableBody/TableBody.js"

class Table extends Component {
    render() {
        return (
            <table id="member-table-grid-container">
                <TableHeader handleSort={this.props.handleSort} sortBy={this.props.sortBy} sortDirection={this.props.sortDirection} selectAll={this.props.selectAll}/>
                <TableBody data={this.props.data} handleSelected={this.props.handleSelected} isSelected={this.props.isSelected}/>
            </table>
        )
    }
}

export default Table