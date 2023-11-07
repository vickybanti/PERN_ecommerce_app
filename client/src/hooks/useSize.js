import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';


    const useTrending = (url) => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(null)
        const [error, setError] = useState(true)

        const {sizes} = useParams()
        
        
        
    
        const fetchSize = async () => {
            const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
        };
    
            try {
                setLoading(true)
    
                const res = await fetch(`https://mooreserver.onrender.com/size/${sizes}`,{
                    method:"GET",
                    headers
                })
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
