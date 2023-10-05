import { useState, useEffect } from "react";


const useFetchOrders = (url) => {
    const [orderData, setData] = useState([]);
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(true)
    
    
    
    useEffect(() => {
        const fetchData = async () => {

            try {
                setLoading(true)
    
                const res = await fetch(`http://localhost:5000/order`)
                const json = await res.json()
    
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
