import React, { Component } from "react";
import "./Table.css"
import applicantData from "./../ApplicantData.js"
import { initializeIcons } from '@uifabric/icons';
import { Icon } from '@fluentui/react/lib/Icon';

import TableHeader from "./TableHeader/TableHeader.js"
import TableBody from "./TableBody/TableBody.js"

class Table extends Component {
    render() {
        return (
            <div id="table-grid-container">
                <TableHeader />
                <TableBody />
            </div>
        )
    }
}

export default Table