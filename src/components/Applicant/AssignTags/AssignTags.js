import React, { Component } from "react";
import "./AssignTags.css";
import Badge from "@kiwicom/orbit-components/lib/Badge";

class AssignTags extends Component {
    render() {
        let add = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Add/SVG/ic_fluent_add_12_regular.svg";
        // const TagsMapping = ({ label, updateApplicants }) => {
        //     const [checked, setChecked] = React.useState(false);
        //     return (
        //         <Radio
        //             checked={checked}
        //             onChange={() => {
        //                 setChecked(!checked)
        //                 updateApplicants()
        //             }}
        //             label={label}
        //         />
        //     );
        // };

        const TagsMapping = ({ applicantTags, allTags }) => (
            <>
                {applicantTags.map((tagId, index) => (
                    <div id="" key={index}>
                        <Badge type="info">{allTags[tagId].text}</Badge>
                    </div>
                ))}
            </>
        );

        return (
            <div id="applicant-assign-tags-container">
                <div id="applicant-assign-tags-item">
                    &nbsp;Tags
                    <TagsMapping
                        applicantTags={this.props.applicant.tags}
                        allTags={this.props.allTags}
                    />
                    <button
                        id="applicant-assign-tags-button"
                    // onClick={this.toggleModifyTagsPopup}
                    >
                        <img id="add-image-tags" src={add} alt="Add icon" />
                    </button>
                </div>
            </div>
        )
    }
}

export default AssignTags