import React, { Component } from "react";
import "./FilterCard.css"
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox";
import Button from "@kiwicom/orbit-components/lib/Button";

const Check = ({ filterValue, isFilterSelected, handleSelectFilter }) => {
  const checked = isFilterSelected(filterValue);
  return (
    <Checkbox
      checked={checked}
      onChange={() => {
        handleSelectFilter(filterValue)
      }}
    />
  );
};

class FilterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedFilters: new Set(this.props.filters)
    };
  }

  isFilterSelected = (filterValue) => {
    // console.log("isFilterSelected: ", filterValue);
    const { updatedFilters } = this.state;
    return updatedFilters.has(filterValue);
  }

  handleSelectFilter = (filterValue) => {
    console.log("handleSelectFilter: ", filterValue);
    const { updatedFilters } = this.state;
    updatedFilters.has(filterValue) ? updatedFilters.delete(filterValue) : updatedFilters.add(filterValue);
    this.setState({
      updatedFilters: updatedFilters
    });
    console.log(this.state.updatedFilters)
  }

  resetFilters = () => {
    // console.log("resetFilters");
    this.setState({
      updatedFilters: new Set(this.props.filters)
    });
    this.props.toggleShowFilter();
  }

  addFilters = () => {
    console.log("addFilters...");
    const { updatedFilters } = this.state;
    console.log("updatedFilters", updatedFilters);
    this.props.handleFilter(updatedFilters);
    this.props.toggleShowFilter();
  }

  render() {
    const activeText = '';
    const releasedText = '';
    return (
      <div className="home-filter-card-container">
        <div className="home-filter-card">
          <div>
            <p className="filter-applicant-status">Filter by applicant status</p>
            <div className="filter-card-row">
              <div className="filter-card-row-label">Active</div>
              <div>
                <Check
                  filterValue="active"
                  isFilterSelected={this.isFilterSelected}
                  handleSelectFilter={this.handleSelectFilter}
                />
              </div>
            </div>
            <div className="filter-card-row">
              <div className="filter-card-row-label">Released</div>
              <div>
                <Check
                  filterValue="released"
                  isFilterSelected={this.isFilterSelected}
                  handleSelectFilter={this.handleSelectFilter}
                />
              </div>
            </div>
          </div>

          <div className="filter-card-bottom-space">
          </div>

          <div className="filter-card-footer-buttons">
            <div className="filter-card-back-button">
              <Button type="secondary"
                onClick={this.resetFilters}
              >Back</Button>
            </div>
            <div className="filter-card-add-filter-button">
              <Button
                onClick={this.addFilters}
              >Add Filter</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FilterCard;