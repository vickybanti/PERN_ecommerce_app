import React,{useState,useEffect} from 'react'
import { makeRequest } from '../makeRequest';


    const useTrending = () => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(null)
        const [error, setError] = useState(true)
        
        
        
        useEffect(() => {
        const fetchDataType = async () => {
            
            try {
                setLoading(true)
    
                const res = await makeRequest.get(`/trending`,{
                    headers:{"Content-Type":"application/json",
                    Origin: "https://pern-ecommerce-app.vercel.app/",
                    "Access-Control-Request-Method": "GET"}
                    
                })
                const json = await res.data
    
                setData(json)
                setLoading(false)
    
            } catch (error) {
                setError(true)
            }
            setLoading(false)
    
        }
    
       
            fetchDataType();
        }, [])
        return { data, loading, error};
    }
    
    


export default useTrending;
