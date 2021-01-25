import axios from "axios";
const FileDownload = require('js-file-download');

// const api = axios.create({
//   baseURL: "https://hatchrecruiting-service.herokuapp.com/",
//   withCredentials: true
// });

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
});

// Organizations
const getAllOrgs = () => api.get("/organizations")
const getOrgById = () => api.get("/organizations/myOrg")
const createOrg = payload => api.post("/organizations", payload)
const updateOrg = payload => api.patch("/organizations/", payload)
const deleteOrg = () => api.delete("/organizations")

// Members
const getMembersAcrossAllOrgs = () => api.get("/members")
const getMembersInOrg = () => api.get("/members/inOrg")
const getMemberById = memberId => api.get(`/members/byId/${memberId}`)
const getThisMember = () => api.get(`/members/me`)
const createMember = payload => api.post("/members", payload)
const addMemberToOrg = (orgId, payload) => api.post(`/members/${orgId}/`, payload)
const updateMember = payload => api.patch(`/members`, payload)
const deleteMember = () => api.delete(`/members`)
const removeMemberFromOrg = (memberId) => api.delete(`/members/${memberId}`)

// Applicants 
const getApplicantsAcrossAllOrgs = () => api.get("/applicants")
const getApplicantsInOrg = () => api.get(`/applicants/inOrg`)
const getApplicantById = applicantId => api.get(`/applicants/byId/${applicantId}`)
const createApplicant = payload => api.post(`/applicants`, payload)
const updateApplicant = (applicantId, payload) => api.patch(`/applicants//${applicantId}`, payload)
const deleteApplicant = applicantId => api.delete(`/applicants/${applicantId}`)

// Upload image
const uploadApplicantImage = (applicantId, payload) => api.post(`/upload-image/applicant/${applicantId}`, payload)
const uploadMemberImage = payload => api.post(`/upload-image/member`, payload)

// Forgot and reset password
const forgotPassword = payload => api.post("/forgot-password", payload)
const resetPassword = (token, payload) => api.post(`reset-password/${token}`, payload)

const insertUser = (payload) => api.post("/signup", payload);
const loginUser = (payload) => api.post("/login", payload);
const downloadTemplate = () => api.get("/downloadTemplate", {responseType: 'blob'}).then((response) => {
  FileDownload(response.data, 'applicantTemplate.xlsx');
});

export const uploadApplicantInfo = (payload) => api.post("/uploadApplicantInfo", payload);
export const generateOrgCode = (payload) => api.post(`/generateOrgCode`, payload)
export const didMemberLikeApplicant = (applicantID) => api.get(`/likes/${applicantID}`)
export const changeMemberLikeApplicant = (applicantID) => api.post(`/likes/${applicantID}`)
const updateMemberStatus = (memberId, payload) => api.patch(`/updateMemberStatus/${memberId}`, payload)
const checkIfUserLoggedIn = () => api.get("/checkUserSession/login")
const checkIfUserIsAdmin = () => api.get("/checkUserSession/admin")


//Profile Page APIs
const confirmPassword = (payload) => api.post(`/updateProfile/confirmPassword`, payload)
const updatePassword = (payload) => api.patch(`/updateProfile/updatePassword`, payload)
const removeMember = () => api.delete(`/updateProfile/deleteMember`)
const logout = () => api.get(`/updateProfile/logout`)

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
  logout
};

export default apis;