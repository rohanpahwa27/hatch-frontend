import axios from "axios";
const FileDownload = require('js-file-download');

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const insertUser = (payload) => api.post("/signup", payload);
export const loginUser = (payload) => api.post("/login", payload);
export const downloadTemplate = () => api.get("/downloadTemplate", {responseType: 'blob'}).then((response) => {
  FileDownload(response.data, 'applicantTemplate.xlsx');
});
export const uploadApplicantInfo = (payload) => api.post("/uploadApplicantInfo", payload);
export const getAllMembers = () => api.get(`/members/${localStorage.getItem('orgID')}`)
export const getOrganization = () => api.get(`/organizations/${localStorage.getItem('orgID')}`)
export const generateOrgCode = (payload) => api.post(`/generateOrgCode`, payload)
export const deleteMember = (memberID) => api.delete(`/members/${localStorage.getItem('orgID')}/${memberID}`)

const apis = {
  insertUser,
  loginUser,
  downloadTemplate,
  uploadApplicantInfo,
  getAllMembers,
  getOrganization,
  generateOrgCode,
  deleteMember
};

export default apis;