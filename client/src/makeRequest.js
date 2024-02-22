import axios from "axios";


const BASE_URL="https://mooreserver.onrender.com/"
const RENDER_API="rnd_aNZ9enklIKwNgICV8oQiMktGR6aj"
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)',
    'origin':'https://pern-ecommerce-app.vercel.app',
    'Access-control-allow-origin': 'https://mooreserver.onrender.com'
};


export const makeRequest = axios.create({
    baseURL : BASE_URL, 
    headers,
    credentials: "include"
    
    });

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers
    
})
