import React, { useEffect, useState } from "react"
import {withRouter} from 'react-router-dom'
import Loading from "@kiwicom/orbit-components/lib/Loading";

import Logo from "../Logo/Logo"
import SideNavBar from "../SideNavBar/SideNavBar"
import LikeInfoBarItem from "./ProfileActions/LikeInfoBarItem/LikeInfoBarItem.js"
import NextInfoBarItem from "./ProfileActions/NextInfoBarItem/NextInfoBarItem.js"
import ApplicantInfo from "./ApplicantInfo/ApplicantInfo.js"
import ApplicantInfoDrop from "./ApplicantInfoDrop/ApplicantInfoDrop.js"
import UploadPhoto from "./UploadPhoto/UploadPhoto.js"
import NewComment from "./NewComment/NewComment.js"
import CommentSection from "./CommentSection/CommentSection"

import api from "../../Api/api"

import "./Applicant.css"

export default function Applicant () {
    const orgId = localStorage.getItem("orgID");
    const [currApplicantId, setCurrApplicantId] = useState(window.location.search ? window.location.search.substring(1, window.location.search.length) : this.props.location.state.id);
    const [currApplicantData, setCurrApplicantData] = useState({});
    const [isLikedByCurrMember, setApplicantLike] = useState(false);
    const [allApplicantData, setApplicantData] = useState([]);
    const [currApplicantComments, setCurrApplicantComments] = useState([]);
    const [testComments, setTestComments] = useState([]);
    const [isLoadingComments, setIsLoading] = useState(true);

    const [memberId, setMemberId] = useState("");

    useEffect(async () => {
        const memberIdResponse = await api.getThisMember();
        const applicantLikeResponse = await api.didMemberLikeApplicant(currApplicantId);
        const allApplicantsResponse = await api.getApplicantsInOrg(orgId);

        setMemberId(memberIdResponse.data.member._id);
        setApplicantLike(applicantLikeResponse.data.like)
        const applicantData =
            allApplicantsResponse.data.applicants.map(applicant => {
                const applicantInfo = {
                    id: applicant._id,
                    firstName: applicant.firstName,
                    lastName: applicant.lastName,
                    email: applicant.email,
                    comments: applicant.comments,
                    likes: applicant.likes,
                    extraFields: applicant.extraFields ? applicant.extraFields : [],
                    status: applicant.status,
                    recruitingCycle: applicant.recruitingCycle,
                    organization: applicant.organization,
                    imageUrl: applicant.imageUrl ? applicant.imageUrl : "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"
                }
                return applicantInfo
            });
        setApplicantData(applicantData);
        const currApplicantDataInfo = applicantData.find(x => x.id == currApplicantId);
        setCurrApplicantData(currApplicantDataInfo);
        setCurrApplicantComments(currApplicantDataInfo.comments)

        let currApplicantCommentData = [];
        let requests = currApplicantDataInfo.comments.map(async (comment) => {
            const memberResponse = await api.getMemberById(comment.member)
            currApplicantCommentData.push(
                {...comment, 
                name: memberResponse.data.member.firstName + " " + memberResponse.data.member.lastName, 
                imageSrc: memberResponse.data.member.imageUrl
            })
        });

        Promise.all(requests)
            .then(() => {
                console.log(currApplicantCommentData);
                setTestComments(currApplicantCommentData);
                setIsLoading(false);
            });
    }, []);

    // useEffect(async () => {
    //     // for each comment
    //         // api call and get name + profile photo
    //         // eventually fix name issue
    //     console.log("hello")
    //     for (const comment in currApplicantComments) {
    //         let memberResponse = await api.getMemberById(comment.member);
    //         console.log(memberResponse.data.member)
    //     }
    // }, []);
    // componentDidMount = async () => {
    //     // TODO: if (set timer for a certain time because otherwise we may want to refresh instead of using old data)
    //     if (!this.state.allApplicants) {
    //         // Applicant page called by Home / direct URL and not next
    //         const applicantId = this.state.currApplicantId ? this.state.currApplicantId : this.state.currApplicantPreCall;
    //         const orgId = localStorage.getItem("orgID");
    //         // TODO: Add check for valid ids
    //         const memberId = await api.getThisMember();

    //         const applicantLike = await api.didMemberLikeApplicant(applicantId);
    //         const allApplicantsResponse = await api.getApplicantsInOrg(orgId);
    //         const applicantData = allApplicantsResponse.data.applicants.map(applicant => {
    //             const applicantInfo = {
    //                 id: applicant._id,
    //                 firstName: applicant.firstName,
    //                 lastName: applicant.lastName,
    //                 email: applicant.email,
    //                 comments: applicant.comments,
    //                 likes: applicant.likes,
    //                 extraFields: applicant.extraFields ? applicant.extraFields : [],
    //                 status: applicant.status,
    //                 recruitingCycle: applicant.recruitingCycle,
    //                 organization: applicant.organization,
    //                 imageUrl: applicant.imageUrl ? applicant.imageUrl : "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"
    //             }
    //             return applicantInfo
    //         });

    //         const applicantIds = applicantData.map(x => x.id);
    //         const currApplicantData = applicantData.find(x => x.id == applicantId);
    //         if (currApplicantData != null) {
    //             this.setState({
    //                 currMemberId: memberId.data.member._id,
    //                 currApplicantId: applicantId,
    //                 currApplicantLikedByMember: applicantLike.data.like,
    //                 currApplicantData: currApplicantData,
    //                 currApplicantComments: currApplicantData.comments,
    //                 allApplicants: applicantData,
    //                 allApplicantIds: applicantIds,
    //                 likedApplicant: applicantLike.data.like ^ this.state.liveLikeStatus
    //             });
    //         } else {
    //             this.setState({
    //                 currApplicantPreCall: null
    //             });
    //         }
    //     } else if (this.state.commentChange) {
    //         const commentsResponse = await api.getComments(this.state.currApplicantId);
    //         this.setState({
    //             currApplicantComments: commentsResponse.data.comments,
    //             commentChange: false
    //         });
    //     } else {
    //         // Applicant page called by next, need to only update the currApplicantInfo
    //         const currApplicantData = this.state.allApplicants.find(x => x.id == this.state.currApplicantId);
    //         const applicantLike = await api.didMemberLikeApplicant(this.state.currApplicantId);
    //         this.setState({
    //             currApplicantLikedByMember: applicantLike.data.like,
    //             currApplicantComments: currApplicantData.comments,
    //             currApplicantData: currApplicantData
    //         });
    //     }
    // }

    const handleNext = () => {
        console.log("next test")
        // TODO: FIX THIS

        // const currIndex = this.state.allApplicantIds.findIndex(id => id === this.state.currApplicantId)
        // if (currIndex === -1) {
        //     // TODO: Add a proper error state
        //     // console.log("yikes this is an issue for applicant")
        // }
        // if (currIndex === this.state.allApplicantIds.length - 1) {
        //     this.setState({
        //         currApplicantId: this.state.allApplicantIds[0],
        //         allApplicants: null
        //     });
        // }

        // this.setState({
        //     currApplicantId: currIndex != (this.state.allApplicantIds.length - 1) && currIndex != -1 ? this.state.allApplicantIds[currIndex + 1] : this.state.allApplicantIds[0]
        // });

        // this.props.history.push({
        //     pathname: '/applicant',
        //     search: this.state.currApplicantId
        // });

        // this.componentDidMount();
    }

    const handleLike = async () => {
        // TODO: double check the data is updated correctly
        setApplicantLike(!isLikedByCurrMember);
        await api.changeMemberLikeApplicant(currApplicantId);
    }
    
    const handleNewComment = async () => {
        const commentsResponse = await api.getComments(currApplicantId);
        setCurrApplicantComments(commentsResponse.data.comments)
    }

    const handleDelete = async () => {
        // GRAB curr comments
        // Delete the old comment
        // Update the thing
        
        // const commentsResponse = await api.getComments(currApplicantId);
        // setTestComments(commentsResponse.data.comments)
    }

    return (
        (Object.keys(currApplicantData).length != 0 && Object.keys(currApplicantComments).length != 0) ? // TODO: CHECK IF DATA IS READY , make cleaner function for readability
        <div id="page-grid-container">
            <Logo />
            <SideNavBar />
            <div id="applicant-grid-container">
                <div id="info-container">
                    <div id="applicantinfobar">
                        <ApplicantInfo applicant={currApplicantData} likedApplicant={isLikedByCurrMember} comments = {currApplicantComments} member={memberId}/>
                    </div>
                    <div id="applicant-action-container">
                        <LikeInfoBarItem applicantID={currApplicantId} likedApplicant={isLikedByCurrMember} handleLike={handleLike}/>
                        <NextInfoBarItem handleNext={handleNext}/>
                    </div>
                </div>
                <div id="content-container">
                    <CommentSection applicant = {currApplicantData} comments = {testComments} member={memberId} isLoading={isLoadingComments} handleDelete={handleDelete}/>
                    <div id="applicant-side-features-container">
                        <UploadPhoto applicant = {currApplicantData}/>
                        {/* <SortComment /> Getting rid of comment likes so only want to sort by recent */}
                        <ApplicantInfoDrop applicant = {currApplicantData}/>
                    </div>
                </div>
                <NewComment applicantID={currApplicantId} handleNewComment={handleNewComment}/>
            </div>
        </div> : <div id="loading-screen"><Loading/></div>
    );
}
