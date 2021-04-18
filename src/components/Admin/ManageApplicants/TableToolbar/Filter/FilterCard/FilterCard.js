import React, { Component } from "react";
import "./FilterCard.css"
import Badge from "@kiwicom/orbit-components/lib/Badge";
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

const AllTagsFilters = ({ allTags, isFilterSelected, handleSelectFilter }) => {
  return (
    Object.entries(allTags).map(([tagId, tagData]) => (
      <div id="filter-card-tags-list-item">
        <div id="individual-tag-badge-tags-list" key={tagId}>
          <Badge type={tagData.color}>
            <div id="individual-tag-text">
              {allTags[tagId].text}
            </div>
          </Badge>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div>
          <Check
            filterValue={tagId}
            isFilterSelected={isFilterSelected}
            handleSelectFilter={handleSelectFilter}
          />
        </div>
      </div>
    ))
  )
}

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
      <div id="applicant-toolbar-filter-card-container">
        <div id="applicant-toolbar-filter-card">

          <p id="filter-applicant-status">Filter by</p>
          
          <div id="applicant-toolbar-filter-card-row">
            <div id="applicant-toolbar-filter-card-row-label">Active</div>
            <div>
              <Check
                filterValue="Active"
                isFilterSelected={this.isFilterSelected}
                handleSelectFilter={this.handleSelectFilter}
              />
            </div>
          </div>
          <div id="applicant-toolbar-filter-card-row">
            <div id="applicant-toolbar-filter-card-row-label">Withdrawn</div>
            <div>
              <Check
                filterValue="Inactive"
                isFilterSelected={this.isFilterSelected}
                handleSelectFilter={this.handleSelectFilter}
              />
            </div>
          </div>

          {/* <AllTagsFilters
            allTags={this.props.allTags}
            isFilterSelected={this.isFilterSelected}
            handleSelectFilter={this.handleSelectFilter}
          /> */}

          <div id="applicant-toolbar-filter-card-footer-buttons">
            <div id="applicant-toolbar-filter-card-back-button">
              <Button type="secondary"
                onClick={this.resetFilters}
              >Back</Button>
            </div>
            <div id="applicant-toolbar-filter-card-add-filter-button">
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