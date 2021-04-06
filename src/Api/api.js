import axios from "axios";
const FileDownload = require('js-file-download');

// const api = axios.create({
//   baseURL: "https://hatchrecruiting-service.herokuapp.com/",
//   withCredentials: true
// });
const BASEURL = (process.env.NODE_ENV == 'production') ? "https://api.hatchrecruiting.com": "http://localhost:3000"
const api = axios.create({
  baseURL: BASEURL,
  withCredentials: true
});

// Organizations
const getAllOrgs = () => api.get("/organizations");
const getOrgById = () => api.get("/organizations/myOrg");
const createOrg = payload => api.post("/organizations", payload);
const updateOrg = payload => api.patch("/organizations/", payload);
const deleteOrg = () => api.delete("/organizations");

// Members
const getMembersAcrossAllOrgs = () => api.get("/members");
const getMembersInOrg = () => api.get("/members/inOrg");
const getMemberById = memberId => api.get(`/members/byId/${memberId}`);
const getThisMember = () => api.get(`/members/me`);
const createMember = payload => api.post("/members", payload);
const addMemberToOrg = (orgId, payload) => api.post(`/members/${orgId}/`, payload);
const updateMember = payload => api.patch(`/members`, payload);
const deleteMember = () => api.delete(`/members`);
const removeMemberFromOrg = (memberId) => api.delete(`/members/${memberId}`);

// Applicants 
const getApplicantsAcrossAllOrgs = () => api.get("/applicants");
const getApplicantsInOrg = () => api.get(`/applicants/inOrg`);
const getApplicantById = applicantId => api.get(`/applicants/byId/${applicantId}`);
const createApplicant = payload => api.post(`/applicants`, payload);
const updateApplicant = (applicantId, payload) => api.patch(`/applicants//${applicantId}`, payload);
const deleteApplicant = applicantId => api.delete(`/applicants/${applicantId}/${commentId}`);

// Upload image
const uploadApplicantImage = (applicantId, payload) => api.post(`/upload-image/applicant/${applicantId}`, payload);
const uploadMemberImage = payload => api.post(`/upload-image/member`, payload);

// Forgot and reset password
const forgotPassword = payload => api.post("/forgot-password", payload);
const resetPassword = (token, payload) => api.post(`reset-password/${token}`, payload);

// Comments
const getComments = applicantId => api.get(`/comments/${applicantId}`);
const addComment = (applicantId, payload) => api.post(`/comments/${applicantId}`, payload);
const changeApplicantCommentLike = (applicantId, commentId) => api.post(`/comments/like/${applicantId}/${commentId}`);
const deleteComment = (applicantId, commentId) => api.delete(`/comments/${applicantId}/${commentId}`);

// Tags
const createTag = (payload) => api.post(`/tags/`, payload);
const updateTag = (payload) => api.patch(`/tags/`, payload);
const deleteTag = (payload) => api.delete(`/tags/`, payload);
const addTagApplicant = (applicantId, payload) => api.post(`/tags/${applicantId}`, payload);
const removeTagApplicant = (applicantId, payload) => api.delete(`/tags/${applicantId}`, payload);

// Signup & login
const insertUser = (payload) => api.post("/signup", payload);
const loginUser = (payload) => api.post("/login", payload);

// Download files
const downloadTemplate = () => api.get("/downloadTemplate", {responseType: 'blob'}).then((response) => {
  FileDownload(response.data, 'applicantTemplate.xlsx');
});
const downloadApplicantsExcel = () => api.get("/downloadInfo/applicant", {responseType: 'blob'}).then((response) => {
  FileDownload(response.data, 'allApplicants.xlsx');
});

// Upload files
const uploadApplicantInfo = (payload) => api.post("/uploadApplicantInfo", payload);

// Generate org code
const generateOrgCode = () => api.get(`/generateOrgCode`);

// Likes
const didMemberLikeApplicant = (applicantID) => api.get(`/likes/${applicantID}`);
const changeMemberLikeApplicant = (applicantID) => api.post(`/likes/${applicantID}`);

// Update Applicants
const updateApplicantStatus = (payload) => api.patch(`/updateApplicantStatus/`, payload);
const removeManyApplicants = (payload) => api.patch(`/updateApplicantStatus/deleteApplicants`, payload);

// Update Members
const updateMemberStatus = (payload) => api.patch(`/updateMemberStatus/`, payload);
const removeManyMembers = (payload) => api.patch(`/updateMemberStatus/deleteMembers`, payload);

// Check login session
const checkIfUserLoggedIn = () => api.get("/checkUserSession/login");
const checkIfUserIsAdmin = () => api.get("/checkUserSession/admin");

//Profile Page APIs
const confirmPassword = (payload) => api.post(`/updateProfile/confirmPassword`, payload);
const updatePassword = (payload) => api.patch(`/updateProfile/updatePassword`, payload);
const removeMember = () => api.delete(`/updateProfile/deleteMember`);
const logout = () => api.get(`/updateProfile/logout`);


const apis = {
  getAllOrgs,
  getOrgById,
  createOrg,
  updateOrg,
  deleteOrg,
  getMembersAcrossAllOrgs,
  getMembersInOrg,
  getMemberById,
  getThisMember,
  createMember,
  addMemberToOrg,
  updateMember,
  deleteMember,
  removeMemberFromOrg,
  getApplicantsAcrossAllOrgs,
  getApplicantsInOrg,
  getApplicantById,
  createApplicant,
  updateApplicant,
  deleteApplicant,
  uploadApplicantImage,
  uploadMemberImage,
  forgotPassword,
  resetPassword,
  getComments,
  addComment,
  changeApplicantCommentLike,
  deleteComment,
  insertUser,
  loginUser,
  downloadTemplate,
  uploadApplicantInfo,
  generateOrgCode,
  didMemberLikeApplicant,
  changeMemberLikeApplicant,
  updateMemberStatus,
  checkIfUserLoggedIn,
  checkIfUserIsAdmin,
  confirmPassword,
  updatePassword,
  removeMember,
  logout,
  removeManyMembers,
  updateApplicantStatus,
  removeManyApplicants,
  downloadApplicantsExcel,
  createTag,
  updateTag,
  deleteTag,
  addTagApplicant,
  removeTagApplicant
};

export default apis;