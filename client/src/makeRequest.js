import axios from "axios";


const BASE_URL="https://mooreserver.onrender.com/"
const RENDER_API="rnd_aNZ9enklIKwNgICV8oQiMktGR6aj"
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)',
    Origin: "*",
    "Access-Control-Allow-Origin": "*"
};


export const makeRequest = axios.create({
    baseURL : BASE_URL, 
    headers
    
    });

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers
    
})
