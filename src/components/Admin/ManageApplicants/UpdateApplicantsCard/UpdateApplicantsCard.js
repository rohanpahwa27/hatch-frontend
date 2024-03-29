import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./UpdateApplicantsCard.css";
import Radio from "@kiwicom/orbit-components/lib/Radio";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import addIcon from "./Icons/add.png";
import gotoIcon from "./Icons/goto.png";

const RadioButton = ({ label, updateApplicants }) => {
    const [checked, setChecked] = React.useState(false);
    return (
        <Radio
            checked={checked}
            onChange={() => {
                setChecked(!checked)
                updateApplicants()
            }}
            label={label}
        />
    );
};

class UpdateApplicantsCard extends Component {
    render() {
        const selectedApplicantId = this.props.selected.values().next().value;
        const numSelectedText = (this.props.numSelected > 1) ? "applicants selected" : "applicant selected";
        const applicantButtonText = (this.props.numSelected == 1) ? "Go to applicant profile" : "";
        const deleteApplicantText = (this.props.numSelected > 1) ? `Delete ${this.props.numSelected} applicants` : "Delete this applicant";

        return (
            (this.props.numSelected > 0) ?
                <div id="update-applicants-container">
                    <div id="update-applicants-card">
                        <p id="num-applicants-selected">{this.props.numSelected} {numSelectedText}</p>
                        <div>
                            <p id="update-applicant-account-status">Update their recruitment status</p>
                            <div id="update-applicant-radio-grid-container">
                                <RadioButton
                                    className="update-applicant-radio"
                                    label="Active"
                                    updateApplicants={event => this.props.updateApplicants("Active")}
                                />
                                <RadioButton
                                    className="update-applicant-radio"
                                    label="Withdrawn"
                                    updateApplicants={event => this.props.updateApplicants("Inactive")}
                                />
                            </div>
                        </div>
                        <div id="card-bottom-space">
                            <br />
                            {(this.props.numSelected == 1) ?
                                (<button
                                    id="manage-applicants-goto-profile-button"
                                    onClick={event => this.props.handleGotoApplicant(selectedApplicantId)}
                                >
                                    <div id="goto-profile-text">
                                        <div>{applicantButtonText}&nbsp;&nbsp;</div>
                                        <img id="goto-icon" src={gotoIcon} alt="Goto icon" />
                                    </div>
                                </button>)
                                :
                                null
                            }
                        </div>
                        <ButtonLink
                            type="critical"
                            iconLeft={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 4C11.5 3.17157 10.8284 2.5 10 2.5C9.17157 2.5 8.5 3.17157 8.5 4H7.5C7.5 2.61929 8.61929 1.5 10 1.5C11.3807 1.5 12.5 2.61929 12.5 4H17C17.2761 4 17.5 4.22386 17.5 4.5C17.5 4.77614 17.2761 5 17 5H16.446L15.1499 16.2292C15.0335 17.2384 14.179 18 13.1631 18H6.83688C5.821 18 4.9665 17.2384 4.85006 16.2292L3.553 5H3C2.75454 5 2.55039 4.82312 2.50806 4.58988L2.5 4.5C2.5 4.22386 2.72386 4 3 4H11.5ZM15.438 5H4.561L5.84347 16.1146C5.90169 16.6192 6.32894 17 6.83688 17H13.1631C13.6711 17 14.0983 16.6192 14.1565 16.1146L15.438 5ZM8.5 7.5C8.74546 7.5 8.94961 7.65477 8.99194 7.85886L9 7.9375V14.0625C9 14.3041 8.77614 14.5 8.5 14.5C8.25454 14.5 8.05039 14.3452 8.00806 14.1411L8 14.0625V7.9375C8 7.69588 8.22386 7.5 8.5 7.5ZM11.5 7.5C11.7455 7.5 11.9496 7.65477 11.9919 7.85886L12 7.9375V14.0625C12 14.3041 11.7761 14.5 11.5 14.5C11.2545 14.5 11.0504 14.3452 11.0081 14.1411L11 14.0625V7.9375C11 7.69588 11.2239 7.5 11.5 7.5Z" fill="#970C0C" /></svg>}
                            id="deleteApplicants"
                            onClick={this.props.deleteApplicants}
                        >{deleteApplicantText}</ButtonLink>
                    </div>
                </div> : null
        )
    }
}

export default UpdateApplicantsCard;