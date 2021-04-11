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
    const { updatedFilters } = this.state;
    return updatedFilters.has(filterValue);
  }

  handleSelectFilter = (filterValue) => {
    const { updatedFilters } = this.state;
    updatedFilters.has(filterValue) ? updatedFilters.delete(filterValue) : updatedFilters.add(filterValue);
    this.setState({
      updatedFilters: updatedFilters
    });
  }

  resetFilters = () => {
    this.setState({
      updatedFilters: new Set(this.props.filters)
    });
    this.props.toggleShowFilter();
  }

  addFilters = () => {
    const { updatedFilters } = this.state;
    this.props.handleFilter(updatedFilters);
    this.props.toggleShowFilter();
  }

  render() {
    return (
      <div className="home-filter-card-container">
        <div className="home-filter-card">
          <div>
            <p className="filter-applicant-status">Filter by</p>
            <div className="filter-card-row">
              <div className="filter-card-row-label">Active</div>
              <div>
                <Check
                  filterValue="Active"
                  isFilterSelected={this.isFilterSelected}
                  handleSelectFilter={this.handleSelectFilter}
                />
              </div>
            </div>
            <div className="filter-card-row">
              <div className="filter-card-row-label">Withdrawn</div>
              <div>
                <Check
                  filterValue="Inactive"
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