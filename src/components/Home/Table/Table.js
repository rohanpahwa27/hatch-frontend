import React, { Component } from "react";
import "./Table.css"

import TableHeader from "./TableHeader/TableHeader.js"
import TableBody from "./TableBody/TableBody.js"

class Table extends Component {
    render() {
        return (
            <table id="table-grid-container">
                <TableHeader handleSort={this.props.handleSort} sortBy={this.props.sortBy} sortDirection={this.props.sortDirection} />
                <TableBody data={this.props.data} />
            </table>
        )
    }
}

export default Table