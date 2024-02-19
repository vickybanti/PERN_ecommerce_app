import { useState, useEffect } from "react";
import { makeRequest } from "../../../client/src/makeRequest";


const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(true)
    
    
    
    useEffect(() => {
        const fetchData = async () => {

            try {
                setLoading(true)
    
                const res = await makeRequest.get(`/newproducts`, {
                    Origin: "https://mooreserver.onrender.com/",
                    "Access-Control-Request-Method": "DELETE"
                
                })
                const json = await res.data;
    
                setData(json)
                setLoading(false)
    
            } catch (error) {
                setError(true)
            }
            setLoading(false)
    
        }
    
        fetchData();
    }, [url])
    return { data, loading, error};
}

export default useFetch;
