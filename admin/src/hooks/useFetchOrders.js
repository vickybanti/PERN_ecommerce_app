import { useState, useEffect } from "react";
import { makeRequest } from "../../../client/src/makeRequest";


const useFetchOrders = (url) => {
    const [orderData, setData] = useState([]);
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(true)
    
    
    
    useEffect(() => {
        const fetchData = async () => {

            try {
                setLoading(true)
    
                const res = await makeRequest.get(`/order`)
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
    return { orderData, loading, error};
}

export default useFetchOrders;
