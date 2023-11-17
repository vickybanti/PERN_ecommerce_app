import axios from "axios";


const BASE_URL="http://localhost:5000/"
const RENDER_API="rnd_aNZ9enklIKwNgICV8oQiMktGR6aj"

export const makeRequest = axios.create({
    baseURL : BASE_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
    });
