import { ThreeSixtySharp } from "@material-ui/icons"
import React, { Component } from "react"
import "./ApplicantComment.css"
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";

class ApplicantComment extends Component {
    render() {
        let grayCircleSrc = "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"
        let heart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_regular.svg"
        let filledheart = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Heart/SVG/ic_fluent_heart_16_filled.svg"
        return (
            <div id="comments">
                {/* TODO: Grab comment data */}
                <div id="applicant-comments">
                    <div id="comment1"> 
                        <div id = "otherusercomment">
                            <img id="user-image" src={grayCircleSrc} alt="User icon" />
                            <div id="commentname">
                                Eunia Lee
                            </div>
                            <div id="comment-info">
                                <div id="date">
                                    Dec 14
                                </div>
                                <div id="likes">
                                    <img id="heart-image" src={filledheart} alt="Filled heart icon" />
                                    <span>21</span>
                                </div>
                            </div>
                            <div id="comment">
                                Emily seems cool! I noticed her ask a bunch of questions about our club during freshman orientation.
                                Great attitude
                            </div>
                        </div>
                    </div>
                    {/* <div id="comment2"> 
                        <div id = "thisusercomment">
                            <img id="this-user-image" src={grayCircleSrc} alt="User icon" />
                            <div id="this-comment-name">
                                Yuki Peters
                            </div>
                            <div id="this-comment-info">
                                <div id="date">
                                    Dec 14
                                </div>
                                <div id="likes">
                                    <img id="heart-image" src={heart} alt="Filled heart icon" />
                                    <span>12</span>
                                </div>
                            </div>
                            <div id="this-comment">
                                Who should talk to her at the next event?
                            </div>
                        </div>
                    </div> */}
                    <div id="comment3"> 
                        <div id = "otherusercomment">
                            <img id="user-image" src={grayCircleSrc} alt="User icon" />
                            <div id="commentname">
                                Leo Au-Yeung
                            </div>
                            <div id="comment-info">
                                <div id="date">
                                    Dec 14
                                </div>
                                <div id="likes">
                                    <img id="heart-image" src={heart} alt="Filled heart icon" />
                                    <span>7</span>
                                </div>
                            </div>
                            <div id="comment">
                                I interviewed Emily! This is what I thought: Emily seems to be really into
                                STEM and stuff, but she showed up to the interview late.. see more
                            </div>
                        </div>
                    </div>
                    <div id="comment4"> 
                        <div id = "otherusercomment">
                            <img id="user-image" src={grayCircleSrc} alt="User icon" />
                            <div id="commentname">
                                Kailey Hanger
                            </div>
                            <div id="comment-info">
                                <div id="date">
                                    Dec 14
                                </div>
                                <div id="likes">
                                    <img id="heart-image" src={heart} alt="Filled heart icon" />
                                    <span>7</span>
                                </div>
                            </div>
                            <div id="comment">
                                I had her in a bio project and she just didn't seem like she really cared about the
                                class at all and I never saw her at quiz section :/ idk bro
                            </div>
                        </div>
                    </div>
                </div>
                <div id="new-comment">
                    {/* TODO: Figure out how to edit the placeholder with two different types */}
                    {/* Comment */}
                    <InputField type="text" placeholder="type your comment here"/> 
                    {/* TODO: Connect to database */}
                    {/* //value={this.props.comment} onChange={this.props.handleCommentChange} /> */}
                </div>
                <div id="send">
                    <Button submit={true} fullWidth={false} type={"secondary"}>Send</Button>
                </div>
            </div>
        )
    }
}

export default ApplicantComment