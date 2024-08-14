import axios from "axios";

const BASE_URL = "https://mooreserver.onrender.com/";
const RENDER_API = "rnd_aNZ9enklIKwNgICV8oQiMktGR6aj";
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${RENDER_API}`,
  
};

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const token = currentUser?.accesstoken;

export const makeRequest = axios.create({
  baseURL: BASE_URL,
  headers,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        common: {
            ...(token && { token: `Bearer ${token}` }),
        },
    },
});
