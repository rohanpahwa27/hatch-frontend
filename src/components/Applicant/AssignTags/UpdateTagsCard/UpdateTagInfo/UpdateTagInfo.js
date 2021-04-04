import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import ListChoice from "@kiwicom/orbit-components/lib/ListChoice";

import "./UpdateTagInfo.css";

class UpdateTagInfo extends Component {
  constructor() {
    super();
  }

  // Unique fxn courtesy of `react-onclickoutside`
  handleClickOutside = (event) => {
    event.stopPropagation();
  }

  render() {
    return (
      <div id="update-tag-info-container">
        <div id="update-tag-info-card">
          <div id="update-tag-name-item">
            Tag name
          </div>
          <div id="update-tag-color-item">
            <ListChoice 
            title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" 
            icon={<Badge type="info">test</Badge>}
            selectable={true}
            />
          </div>
          <div id="update-tag-delete-item">
            Delete
          </div>
          <div id="update-tag-done-item">
            Done
          </div>
        </div>
      </div>
    )
  }
}

export default UpdateTagInfo;