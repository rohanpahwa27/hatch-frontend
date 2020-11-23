import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const insertUser = (payload) => api.post("/signup", payload);
export const loginUser = (payload) => api.post("/login", payload);

const apis = {
  insertUser,
  loginUser
};

export default apis;