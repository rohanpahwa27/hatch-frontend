import React, { Component } from "react";
import Radio from "@kiwicom/orbit-components/lib/Radio";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import ListChoice from "@kiwicom/orbit-components/lib/ListChoice";

import "./UpdateTagInfo.css";

const TagChoice = ({ color, label, currentColor, changeTagColor }) => {
  // console.log("color", color)
  // console.log('currentColor', currentColor)
  return (
    <div id="update-tag-color-list-item">
      <div>
        <Badge type={color}>
          {label}
        </Badge>
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <div>
        <Radio
          checked={color === currentColor}
          onChange={() => {
            changeTagColor(color)
          }}
        />
      </div>
    </div>

  );
};

const TagsColorList = ({ currentColor, changeTagColor }) => {
  return (
    <div id="update-tag-color-list-container">
      <TagChoice color="critical" label="Light red" currentColor={currentColor} changeTagColor={changeTagColor} />
      <TagChoice color="criticalInverted" label="Dark red" currentColor={currentColor} changeTagColor={changeTagColor} />
      <TagChoice color="warning" label="Light orange" currentColor={currentColor} changeTagColor={changeTagColor} />
      <TagChoice color="warningInverted" label="Dark orange" currentColor={currentColor} changeTagColor={changeTagColor} />
      <TagChoice color="success" label="Light green" currentColor={currentColor} changeTagColor={changeTagColor} />
      <TagChoice color="successInverted" label="Dark green" currentColor={currentColor} changeTagColor={changeTagColor} />
      <TagChoice color="info" label="Light blue" currentColor={currentColor} changeTagColor={changeTagColor} />
      <TagChoice color="infoInverted" label="Dark blue" currentColor={currentColor} changeTagColor={changeTagColor} />
    </div>
  )
}

class UpdateTagInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color,
      text: this.props.text
    }
  }

  changeTagColor = (type) => {
    this.setState({
      color: type
    });
  }

  changeTagText = (name) => {
    this.setState({
      text: name
    });
  }

  render() {
    return (
      <div id="update-tag-info-container">
        <div id="update-tag-info-card">
          <div id="update-tag-name-item">
            Tag name
            {/* {this.state.text} */}
            {/* Call changeTagText to update local state */}
          </div>
          <div id="update-tag-color-item">
            <TagsColorList
              // id={this.props.id}
              currentColor={this.state.color}
              changeTagColor={this.changeTagColor}
            />
          </div>
          <div id="update-tag-delete-item">
            Delete
          </div>
          <div id="update-tag-done-item">
            <button
              onClick={event => this.props.handleUpdateTag(this.props.id, this.state.color, this.state.text)}
            >
              Done
            </button>
            {/* Call api update tag color with this state's color */}
            {/* Call api update text with this state's text */}
          </div>
        </div>
      </div>
    )
  }
}

export default UpdateTagInfo;