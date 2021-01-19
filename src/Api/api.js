import axios from "axios";
const FileDownload = require('js-file-download');

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Organizations
const getAllOrgs = () => api.get("/organizations")
const getOrgById = orgId => api.get(`/organizations/${orgId}`)
const createOrg = payload => api.post("/organizations", payload)
const updateOrg = (orgId, payload) => api.patch(`/organizations/${orgId}`, payload)
const deleteOrg = orgId => api.delete(`/organizations/${orgId}`)

// Members
const getMembersAcrossAllOrgs = () => api.get("/members")
const getMembersInOrg = orgId => api.get(`/members/inOrg/${orgId}`)
const getMemberById = memberId => api.get(`/members/byId/${memberId}`)
const createMember = payload => api.post("/members", payload)
const addMemberToOrg = (orgId, memberId, payload) => api.post(`/members/${orgId}/${memberId}`, payload)
const updateMember = (memberId, payload) => api.patch(`/members//${memberId}`, payload)
const deleteMember = memberId => api.delete(`/members/${memberId}`)
const removeMemberFromOrg = (orgId, memberId) => api.delete(`/members/${orgId}/${memberId}`)

// Applicants 
const getApplicantsAcrossAllOrgs = () => api.get("/applicants")
const getApplicantsInOrg = orgId => api.get(`/applicants/inOrg/${orgId}`)
const getApplicantById = applicantId => api.get(`/applicants/byId/${applicantId}`)
const createApplicant = (orgId, payload) => api.post(`/applicants/${orgId}`, payload)
const updateApplicant = (applicantId, payload) => api.patch(`/applicants//${applicantId}`, payload)
const deleteApplicant = applicantId => api.delete(`/applicants/${applicantId}`)

// Upload image
const uploadApplicantImage = (applicantId, payload) => api.post(`/upload-image/applicant/${applicantId}`, payload)
const uploadMemberImage = (memberId, payload) => api.post(`/upload-image/member/${memberId}`, payload)

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
export const didUserLikeMember = (applicantID) => api.get(`/${localStorage.getItem('userID')}/${applicantID}`)
export const changeUserLikeMember = (applicantID) => api.get(`/${localStorage.getItem('userID')}/${applicantID}`)
export const updateMemberStatus = (payload, memberID) => api.patch(`/updateMemberStatus/${localStorage.getItem('orgID')}/${memberID}`, payload)

const apis = {
  getAllOrgs,
  getOrgById,
  createOrg,
  updateOrg,
  deleteOrg,
  getMembersAcrossAllOrgs,
  getMembersInOrg,
  getMemberById,
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
  didUserLikeMember,
  changeUserLikeMember,
  updateMemberStatus
};

export default apis;