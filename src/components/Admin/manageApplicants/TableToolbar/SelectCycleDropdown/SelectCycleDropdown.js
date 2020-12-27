import React, { Component } from "react"
import "./SelectCycleDropdown.css"
import Select from "@kiwicom/orbit-components/lib/Select";
// import downArrowIcon from "./down-arrow.png"

class SelectCycleDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cycleOptions: this.props.cycleOptions,
            selectedOption: this.props.selectedOption,
            handleCycleSelect: this.props.handleCycleSelect
        }
    }

    render() {
        return (
            <div id="select-cycle-dropdown-flex-container">
                <div>Active recruiting cycle: </div>
                <Select 
                    options={this.state.cycleOptions} 
                    value={this.state.selectedOption} 
                    onChange={this.state.handleCycleSelect}
                    size="small"
                />
            </div>
        )
    }
}

export default SelectCycleDropdown