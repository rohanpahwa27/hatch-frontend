import axios from "axios";
const FileDownload = require('js-file-download');

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Organizations
const getAllOrgs = () => api.get("/organizations")
const createOrg = payload => api.post("/organizations", payload)
const getOrg = () => api.get(`/organizations/${localStorage.getItem('orgID')}`)
const updateOrg = (orgId, payload) => api.patch(`/organizations/${orgId}`, payload)
const deleteOrg = orgId => api.delete(`/organizations/${orgId}`)

// Members
const getMembersAcrossAllOrgs = () => api.get("/members")
const getMembersInOrg = () => api.get(`/members/${localStorage.getItem('orgID')}`)
const createMember = (orgId, payload) => api.post(`/members/${orgId}`, payload)
const getMember = (orgId, memberId) => api.get(`/members/${orgId}/${memberId}`)
const updateMember = (orgId, memberId, payload) => api.patch(`/members/${orgId}/${memberId}`, payload)
const deleteMember = (memberID) => api.delete(`/members/${localStorage.getItem('orgID')}/${memberID}`)

// Applicants 
const getApplicantsAcrossAllOrgs = () => api.get("/applicants")
const getApplicantsInOrg = orgId => api.get(`/applicants/${orgId}`)
const createApplicant = (orgId, payload) => api.post(`/applicants/${orgId}`, payload)
const getApplicant = (orgId, applicantId) => api.get(`/applicants/${orgId}/${applicantId}`)
const updateApplicant = (orgId, applicantId, payload) => api.patch(`/applicants/${orgId}/${applicantId}`, payload)
const deleteApplicant = (orgId, applicantId) => api.delete(`/applicants/${orgId}/${applicantId}`)

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
  createOrg,
  getOrg,
  updateOrg,
  deleteOrg,
  getMembersAcrossAllOrgs,
  getMembersInOrg,
  createMember,
  getMember,
  updateMember,
  deleteMember,
  getApplicantsAcrossAllOrgs,
  getApplicantsInOrg,
  createApplicant,
  getApplicant,
  updateApplicant,
  deleteApplicant,
  insertUser,
  loginUser,
  downloadTemplate,
  uploadApplicantInfo,
  generateOrgCode,
  deleteMember,
  didUserLikeMember,
  changeUserLikeMember,
  updateMember
};

export default apis;