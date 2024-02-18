import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { makeRequest } from '../../../client/src/makeRequest';


    const useTrending = (url) => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(null)
        const [error, setError] = useState(true)

        const {sizes} = useParams()
        
        
        
    
        const fetchSize = async () => {
    
            try {
                setLoading(true)
    
                const res = await makeRequest.get(`/size/${sizes}`)
                const json = await res.data;
    
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
