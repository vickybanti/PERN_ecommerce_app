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
    
            const res = await fetch("https://mooreserver.onrender.com/trending",{
          method:"GET",
          mode:"cors"
        });
        const json = await res.json();
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
