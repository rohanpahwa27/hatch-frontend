import React, { Component } from "react"
import "./SelectCycleDropdown.css"
import Select from "@kiwicom/orbit-components/lib/Select";
// import downArrowIcon from "./down-arrow.png"

class SelectCycleDropdown extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="select-cycle-dropdown-flex-container">
                <div id="toolbar-info-text">
                    <span>Active recruiting cycle: </span>
                </div>
                <div id="select-cycle-dropdown">
                    <Select
                        options={this.props.cycleOptions}
                        value={this.props.selectedOption}
                        onChange={this.props.handleCycleSelect}
                        size="small"
                    />
                </div>
            </div>
        )
    }
}

export default SelectCycleDropdown