import axios from "axios";
const FileDownload = require('js-file-download');

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Organizations
const getAllOrgs = () => api.get("/organizations")
const createOrg = payload => api.post("/organizations", payload)
const getOrg = orgId => api.get(`/organizations/${orgId}`)
const updateOrg = (orgId, payload) => api.patch(`/organizations/${orgId}`, payload)
const deleteOrg = orgId => api.delete(`/organizations/${orgId}`)

// Members
const getMembersAcrossAllOrgs = () => api.get("/members")
const getMembersInOrg = orgId => api.get(`/members/${orgId}`)
const createMember = (orgId, payload) => api.post(`/members/${orgId}`, payload)
const getMember = (orgId, memberId) => api.get(`/members/${orgId}/${memberId}`)
const updateMember = (orgId, memberId, payload) => api.patch(`/members/${orgId}/${memberId}`, payload)
const deleteMember = (orgId, memberId) => api.delete(`/members/${orgId}/${memberId}`)

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
export const getAllMembers = () => api.get(`/members/${localStorage.getItem('orgID')}`)
export const getOrganization = () => api.get(`/organizations/${localStorage.getItem('orgID')}`)
export const generateOrgCode = (payload) => api.post(`/generateOrgCode`, payload)
export const deleteMember = (memberID) => api.delete(`/members/${localStorage.getItem('orgID')}/${memberID}`)
export const didUserLikeMember = (applicantID) => api.get(`/${localStorage.getItem('userID')}/${applicantID}`)
export const changeUserLikeMember = (applicantID) => api.get(`/${localStorage.getItem('userID')}/${applicantID}`)
export const updateMember = (payload, memberID) => api.patch(`/${localStorage.getItem('orgID')}/${memberID}`, payload)

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
  getAllMembers,
  getOrganization,
  generateOrgCode,
  deleteMember,
  didUserLikeMember,
  changeUserLikeMember,
  updateMember
};

export default apis;