import axios from "axios";


const BASE_URL="https://mooreserver.onrender.com/"
const RENDER_API="rnd_aNZ9enklIKwNgICV8oQiMktGR6aj"

export const makeRequest = axios.create({
    baseURL : BASE_URL, 
    
    });
