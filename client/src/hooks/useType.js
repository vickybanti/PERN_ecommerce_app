import {useState,useEffect} from 'react'


    const useType = (url) => {
        const [dataType, setDataType] = useState([]);
        const [loadingType, setLoadingType] = useState(null)
        const [errorType, setErrorType] = useState(true)
        
        
        
    
        const fetchDataType = async () => {
    
            try {
                setLoadingType(true)
    
                const res = await fetch(`https://mooreserver.onrender.com/type`)
                const json = await res.json()
    
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
