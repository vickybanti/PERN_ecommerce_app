import {useState,useEffect} from 'react'
import { makeRequest } from '../makeRequest';


    const useType = (url) => {
        const [dataType, setDataType] = useState([]);
        const [loadingType, setLoadingType] = useState(null)
        const [errorType, setErrorType] = useState(true)
        
        
        
    
        const fetchDataType = async () => {
            
    
            try {
                setLoadingType(true)
    
                const res = await makeRequest.get(`/type`)
                const json = await res.data
    
                setDataType(json)
                setLoadingType(false)
    
            } catch (error) {
                setErrorType(true)
            }
            setLoadingType(false)
    
        }
    
        useEffect(() => {
            fetchDataType();
        }, [url])
        return { dataType, loadingType, errorType};
    }
    
    


export default useType;
