import React,{useState,useEffect} from 'react'


    const useTrending = (url) => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(null)
        const [error, setError] = useState(true)
        
        
        
        useEffect(() => {
        const fetchDataType = async () => {
    
            try {
                setLoading(true)
    
                const res = await fetch(`http://localhost:5000/trending`)
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
