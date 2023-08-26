import axios from "axios";

export const makeRequest = axios.create({
    baseURL : process.env.DATABASE_URL, 
    headers: {
        Authorization: "bearer " + process.env.DATABASE_TOKEN,
    },
    });
