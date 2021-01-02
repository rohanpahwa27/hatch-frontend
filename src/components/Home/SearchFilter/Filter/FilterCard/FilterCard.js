import React, { Component } from "react";
import "./FilterCard.css"
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox";
import Button from "@kiwicom/orbit-components/lib/Button";

// const Check = ({ filters, handleSelected, isSelected }) => {
const Check = () => {
  // let [checked] = React.useState(false);
  // checked = isSelected(filters);
  return (
    <Checkbox
    // checked={checked}
    // onChange={() => {
    //   handleSelected(filters)
    // }}
    />
  );
};

class FilterCard extends Component {
  render() {
    return (
      <div className="home-filter-card-container">
        <div className="home-filter-card">
          <div>
            <p className="filter-applicant-status">Filter by applicant status</p>
            <div className="filter-card-row">
              <div className="filter-card-row-label">Active</div>
              <div><Check /></div>
            </div>
            <div className="filter-card-row">
              <div className="filter-card-row-label">Released</div>
              <div><Check /></div>
            </div>
          </div>

          <div className="filter-card-bottom-space">
          </div>
          
          <div className="filter-card-footer-buttons">
            <div className="filter-card-back-button">
              <Button
                type="secondary"
              >Back</Button>
            </div>
            <div className="filter-card-add-filter-button">
              <Button
              // onClick={this.props.deleteMembers}
              >Add Filter</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FilterCard;