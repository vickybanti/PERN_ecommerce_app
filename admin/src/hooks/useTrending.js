import React,{useState,useEffect} from 'react'
import { makeRequest } from '../../../client/src/makeRequest';


    const useTrending = (url) => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(null)
        const [error, setError] = useState(true)
        
        
        
        useEffect(() => {
        const fetchDataType = async () => {
    
            try {
                setLoading(true)
    
                const res = await makeRequest.get(`/trending`)
                const json = await res.json()
    
                setData(json)
                setLoading(false)
    
            } catch (error) {
                setError(true)
            }
            setLoading(false)
    
        }
    
       
            fetchDataType();
        }, [url])
        return { data, loading, error};
    }
    
    


export default useTrending;
