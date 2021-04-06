import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import Radio from "@kiwicom/orbit-components/lib/Radio";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import Remove from "@kiwicom/orbit-components/lib/icons/Remove";

import "./UpdateTagInfo.css";

const TagChoice = ({ color, label, currentColor, changeTagColor }) => {
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

  handleClickOutside = (event) => {
    event.stopPropagation();
    this.props.toggleEditTag(this.props.id);
  }

  changeTagColor = (type) => {
    this.setState({
      color: type
    });
  }

  changeTagText = (event) => {
    this.setState({
      text: event.target.value
    });
  }

  deleteTag = (id) => {
    this.props.handleDeleteTag(id);
    this.props.toggleEditTag(id);
  }

  updateTag = (id, color, text) => {
    this.props.handleUpdateTag(id, color, text);
    this.props.toggleEditTag(id);
  }

  render() {
    return (
      <div id="update-tag-info-container">
        <div id="update-tag-info-card">
          <div id="update-tag-item">
            <InputField
              type="text"
              placeholder="Tag name"
              label="Tag name"
              inlineLabel={true}
              value={this.state.text}
              error={this.state.text.length < 3 ? "Tag name must be at least 3 characters" : null}
              minLength={3}
              maxLength={30}
              onChange={this.changeTagText}
            />
          </div>
          <div id="update-tag-item">
            <TagsColorList
              currentColor={this.state.color}
              changeTagColor={this.changeTagColor}
            />
          </div>
          <div id="update-tag-item">
            <Button
              fullWidth={true}
              type={"criticalSubtle"}
              iconLeft={<Remove />}
              onClick={event => this.deleteTag(this.props.id)}
            >
              Delete this tag
            </Button>
          </div>
          <div id="update-tag-item">
            <Button
              fullWidth={true}
              type={"secondary"}
              disabled={this.state.text === null || this.state.text.length < 3}
              onClick={event => this.updateTag(this.props.id, this.state.color, this.state.text)}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default onClickOutside(UpdateTagInfo, { excludeScrollbar: true });