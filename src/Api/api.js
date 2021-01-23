import axios from "axios";
const FileDownload = require('js-file-download');

const api = axios.create({
  baseURL: "https://hatchrecruiting-service.herokuapp.com/:5000",
  withCredentials: true
});

// const api = axios.create({
//   baseURL: "http://localhost:5000",
//   withCredentials: true
// });

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

const insertUser = (payload) => api.post("/signup", payload);
const loginUser = (payload) => api.post("/login", payload);
const downloadTemplate = () => api.get("/downloadTemplate", {responseType: 'blob'}).then((response) => {
  FileDownload(response.data, 'applicantTemplate.xlsx');
});

export const uploadApplicantInfo = (payload) => api.post("/uploadApplicantInfo", payload);
export const generateOrgCode = (payload) => api.post(`/generateOrgCode`, payload)
export const didUserLikeMember = (applicantID) => api.get(`/${localStorage.getItem('userID')}/${applicantID}`)
export const changeUserLikeMember = (applicantID) => api.get(`/${localStorage.getItem('userID')}/${applicantID}`)
const updateMemberStatus = (memberID, payload) => api.patch(`/updateMemberStatus/${localStorage.getItem('orgID')}/${memberID}`, payload)
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
  insertUser,
  loginUser,
  downloadTemplate,
  uploadApplicantInfo,
  generateOrgCode,
  deleteMember,
  didUserLikeMember,
  changeUserLikeMember,
  updateMemberStatus,
  checkIfUserLoggedIn,
  checkIfUserIsAdmin,
  confirmPassword,
  updatePassword,
  removeMember,
  logout
};

export default apis;