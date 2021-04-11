import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import Loading from "@kiwicom/orbit-components/lib/Loading";

import Logo from "../Logo/Logo";
import SideNavBar from "../SideNavBar/SideNavBar";
import LikeInfoBarItem from "./ProfileActions/LikeInfoBarItem/LikeInfoBarItem.js";
import NextInfoBarItem from "./ProfileActions/NextInfoBarItem/NextInfoBarItem.js";
import ApplicantInfo from "./ApplicantInfo/ApplicantInfo.js";
import ApplicantInfoDrop from "./ApplicantInfoDrop/ApplicantInfoDrop.js";
import AssignTags from "./AssignTags/AssignTags.js";
import UploadPhoto from "./UploadPhoto/UploadPhoto.js";
import NewComment from "./NewComment/NewComment.js";
import CommentSection from "./CommentSection/CommentSection";
import { trackEvent } from "../../tracking/utils";
import api from "../../Api/api";

import "./Applicant.css";

export default function Applicant(props) {
    const orgId = localStorage.getItem("orgID");
    const history = useHistory();
    const [currApplicantId, setCurrApplicantId] = useState(window.location.search ? window.location.search.substring(1, window.location.search.length) : props.location.state.id);
    const [currApplicantData, setCurrApplicantData] = useState({});
    const [isLikedByCurrMember, setApplicantLike] = useState(false);
    const [allApplicantData, setApplicantData] = useState([]);
    const [allOrganizationTags, setAllOrganizationTags] = useState({});
    const [commentData, setCommentData] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoadingComments, setIsLoading] = useState(true);
    const [isLessThan, setLessThan] = useState(true);
    const [memberId, setMemberId] = useState("");
    const [allApplicantIds, setApplicantIds] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(async () => {
        const memberIdResponse = await api.getThisMember();
        const allApplicantsResponse = await api.getApplicantsInOrg(orgId);
        const currOrganizationResponse = await api.getMyOrg();
        const applicantData =
            allApplicantsResponse.data.applicants.map(applicant => {
                const applicantInfo = {
                    id: applicant._id,
                    firstName: applicant.firstName,
                    lastName: applicant.lastName,
                    email: applicant.email,
                    comments: applicant.comments,
                    likes: applicant.likes,
                    tags: applicant.tags,
                    extraFields: applicant.extraFields ? applicant.extraFields : [],
                    status: applicant.status,
                    recruitingCycle: applicant.recruitingCycle,
                    organization: applicant.organization,
                    imageUrl: applicant.imageUrl ? applicant.imageUrl : "https://images.squarespace-cdn.com/content/v1/5ba24ff7fcf7fdb9d4c3e95e/1544106754797-TZN1YT7FVM4J2VXAM6G8/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/image-asset.jpeg"
                }
                return applicantInfo
            });
        const organizationTags = currOrganizationResponse.data.organization.tags.reduce((map, tag) => {
            map[tag._id] = {
                color: tag.color,
                text: tag.text,
            }
            return map
        }, {});

        setMemberId(memberIdResponse.data.member._id);
        setApplicantData(applicantData);
        setApplicantIds(applicantData.map(x => x.id));
        setAllOrganizationTags(organizationTags);
    }, [refresh]);

    useEffect(async () => {
        // TODO: fix next bug where many fast next clicks look weird
        if ((Object.keys(allApplicantData).length != 0)) {
            const applicantLikeResponse = await api.didMemberLikeApplicant(currApplicantId);
            setApplicantLike(applicantLikeResponse.data.like)

            const currApplicantDataInfo = allApplicantData.find(x => x.id == currApplicantId);
            setIsLoading(true);
            setComments([]);
            setCurrApplicantData(currApplicantDataInfo);
            if (currApplicantDataInfo.comments.length < 10) {
                setLessThan(true);
            } else {
                setLessThan(false);
            }
            setCommentData(currApplicantDataInfo.comments);
        }
    }, [currApplicantId, allApplicantData]);

    useEffect(async () => {
        if ((Object.keys(currApplicantData).length != 0)) {
            let currApplicantCommentData = [];
            let requests = commentData.map(async (comment, index) => {
                const memberResponse = await api.getMemberById(comment.member)
                currApplicantCommentData.splice(index, 0,
                    {
                        ...comment,
                        name: memberResponse.data.member.firstName + " " + memberResponse.data.member.lastName,
                        imageSrc: memberResponse.data.member.imageUrl
                    })
            });

            Promise.all(requests)
                .then(() => {
                    setComments(currApplicantCommentData);
                    setIsLoading(false);
                });
        }
    }, [commentData]);

    const handleNext = () => {
        history.push({
            pathname: '/applicant',
            search: currApplicantId
        });

        const currIdIndex = allApplicantIds.findIndex(id => id === currApplicantId)
        if (currIdIndex === -1) {
            setCurrApplicantId(allApplicantIds[0]);
            // TODO: Add proper error state
        } else if (currIdIndex === allApplicantIds.length - 1) {
            setCurrApplicantId(allApplicantIds[0]);
            setApplicantData([])
            setRefresh(!refresh);
        } else {
            setCurrApplicantId(allApplicantIds[currIdIndex + 1]);
        }
        trackEvent('go to next applicant')
    }

    const handleLike = async () => {
        // TODO: double check the data is updated correctly
        setApplicantLike(!isLikedByCurrMember);
        await api.changeMemberLikeApplicant(currApplicantId);
        trackEvent('like applicant')
    }

    const handleNewComment = async () => {
        const commentsResponse = await api.getComments(currApplicantId);
        // TODO: filter to get the comments that aren't already there, will lead to bug if multiple people comment at the same time
        let newComment = commentsResponse.data.comments[commentsResponse.data.comments.length - 1]
        const memberResponse = await api.getMemberById(newComment.member)

        let currApplicantCommentData = comments;
        currApplicantCommentData.push(
            {
                ...newComment,
                name: memberResponse.data.member.firstName + " " + memberResponse.data.member.lastName,
                imageSrc: memberResponse.data.member.imageUrl
            })
        setComments([])
        setComments(currApplicantCommentData)
        trackEvent('comment on applicant')
    }

    const handleDelete = async (commentId) => {
        let newComments = comments.filter(comment => comment._id !== commentId)
        setComments(newComments)
    }

    const handleRefreshTags = (organizationResponse) => {
        const newOrganizationTags = organizationResponse.data.organization.tags.reduce((map, tag) => {
            map[tag._id] = {
                color: tag.color,
                text: tag.text,
            }
            return map
        }, {});
        setAllOrganizationTags(newOrganizationTags);
    }

    const handleCreateTag = async (color, text) => {
        const organizationResponse = await api.createTag({ color, text });
        handleRefreshTags(organizationResponse);
    }

    const handleUpdateTag = async (tagId, color, text) => {
        const organizationResponse = await api.updateTag({ tagId, color, text });
        handleRefreshTags(organizationResponse);
    }

    const handleDeleteTag = async (_id) => {
        const organizationResponse = await api.deleteTag( { _id: _id } );
        handleRefreshTags(organizationResponse);
    }

    const handleAddTagApplicant = async (tagId) => {
        if (currApplicantData.tags.indexOf(tagId) === -1) {
            const applicantResponse = await api.addTagApplicant(currApplicantId, { tagId });
            setCurrApplicantData(applicantResponse.data.applicant);
        }
    }

    const handleRemoveTagApplicant = async (tagId) => {
        if (currApplicantData.tags.indexOf(tagId) !== -1) {
            const applicantResponse = await api.removeTagApplicant(currApplicantId, { tagId });
            setCurrApplicantData(applicantResponse.data.applicant);
        }
    }

    return (
        (Object.keys(currApplicantData).length != 0) ? // CHECK IF DATA IS READY TODO: make cleaner function for readability
            <div id="page-grid-container">
                <Logo />
                <SideNavBar />
                <div id="applicant-grid-container">
                    <div id="info-container">
                        <div id="applicantinfobar">
                            <ApplicantInfo applicant={currApplicantData} likedApplicant={isLikedByCurrMember} comments={comments} member={memberId} />
                        </div>
                        <div id="applicant-action-container">
                            <LikeInfoBarItem applicantID={currApplicantId} likedApplicant={isLikedByCurrMember} handleLike={handleLike} />
                            <NextInfoBarItem handleNext={handleNext} />
                        </div>
                    </div>
                    <div id="content-container">
                        <CommentSection applicant={currApplicantData} comments={comments} member={memberId} isLoading={isLoadingComments} isLessThan={isLessThan} handleDelete={handleDelete} />
                        <div id="applicant-side-features-container">
                            <UploadPhoto applicant={currApplicantData} />
                            <AssignTags
                                applicant={currApplicantData}
                                allTags={allOrganizationTags}
                                handleTagCRUD={{ handleCreateTag, handleUpdateTag, handleDeleteTag }}
                                handleTagApplicant={{ handleAddTagApplicant, handleRemoveTagApplicant }}
                            />
                            {/* <SortComment /> Getting rid of comment likes so only want to sort by recent */}
                            <ApplicantInfoDrop applicant={currApplicantData} />
                        </div>
                    </div>
                    <NewComment applicantID={currApplicantId} handleNewComment={handleNewComment} />
                </div>
            </div> : <div id="loading-screen"><Loading /></div>
    );
}
