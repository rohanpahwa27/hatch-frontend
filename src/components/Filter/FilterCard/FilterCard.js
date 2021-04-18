import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox";
import Button from "@kiwicom/orbit-components/lib/Button";

import "./FilterCard.css";

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
  );
};

class FilterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedFilters: this.props.filters
    };
  }

  // Unique fxn courtesy of `react-onclickoutside`
  handleClickOutside = (event) => {
    this.setState({
      updatedFilters: this.props.filters
    });
    this.props.toggleShowFilter();
  }

  isFilterSelected = (filterValue) => {
    const { updatedFilters } = this.state;
    return (filterValue == "Active" || filterValue == "Inactive") ?
      updatedFilters.status.has(filterValue) : updatedFilters.tags.has(filterValue)
  }

  handleSelectFilter = (filterValue) => {
    const { updatedFilters } = this.state;
    (filterValue == "Active" || filterValue == "Inactive") ?
      updatedFilters.status.has(filterValue) ? updatedFilters.status.delete(filterValue) : updatedFilters.status.add(filterValue)
      :
      updatedFilters.tags.has(filterValue) ? updatedFilters.tags.delete(filterValue) : updatedFilters.tags.add(filterValue)
    this.setState({
      updatedFilters: updatedFilters
    });
  }

  // resetFilters = () => {
  //   this.setState({
  //     updatedFilters: new Set(this.props.filters)
  //   });
  //   this.props.toggleShowFilter();
  // }

  addFilters = () => {
    const { updatedFilters } = this.state;
    this.props.handleFilter(updatedFilters);
    this.props.toggleShowFilter();
  }

  render() {
    return (
      <div id="home-filter-card-container">
        <div id="home-filter-card">

          <p id="filter-card-header-text">Filter by</p>

          <div id="filter-card-row-header">
            <p id="filter-row-header-text">Applicant status</p>
          </div>
          <div id="filter-card-row">
            <div id="filter-card-row-label">Active</div>
            <div>
              <Check
                filterValue="Active"
                isFilterSelected={this.isFilterSelected}
                handleSelectFilter={this.handleSelectFilter}
              />
            </div>
          </div>
          <div id="filter-card-row">
            <div id="filter-card-row-label">Withdrawn</div>
            <div>
              <Check
                filterValue="Inactive"
                isFilterSelected={this.isFilterSelected}
                handleSelectFilter={this.handleSelectFilter}
              />
            </div>
          </div>

          <div id="filter-card-row-header">
            <p id="filter-row-header-text">Tag</p>
          </div>
          <AllTagsFilters
            allTags={this.props.allTags}
            isFilterSelected={this.isFilterSelected}
            handleSelectFilter={this.handleSelectFilter}
          />

          <div id="filter-card-footer-buttons">
            {/* <div id="filter-card-back-button">
              <Button type="secondary"
                onClick={this.resetFilters}
              >Back</Button>
            </div> */}
            <div id="filter-card-add-filter-button">
              <Button
                onClick={this.addFilters}
              >Done</Button>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default onClickOutside(FilterCard, { excludeScrollbar: true });