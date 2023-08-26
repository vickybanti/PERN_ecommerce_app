import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';


    const useTrending = (url) => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(null)
        const [error, setError] = useState(true)

        const {sizes} = useParams()
        
        
        
    
        const fetchSize = async () => {
    
            try {
                setLoading(true)
    
                const res = await fetch(`http://localhost:5000/size/${sizes}`)
                const json = await res.json()
    
                setData(json)
                setLoading(false)
    
            } catch (error) {
                setError(true)
            }
            setLoading(false)
    
        }
    
        useEffect(() => {
            fetchSize();
        }, [url])
        return { data, loading, error};
    }
    
    


export default useTrending;
