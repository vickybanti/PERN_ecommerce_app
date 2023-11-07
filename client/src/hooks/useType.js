import {useState,useEffect} from 'react'


    const useType = (url) => {
        const [dataType, setDataType] = useState([]);
        const [loadingType, setLoadingType] = useState(null)
        const [errorType, setErrorType] = useState(true)
        
        
        
    
        const fetchDataType = async () => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
            };
    
            try {
                setLoadingType(true)
    
                const res = await fetch(`https://mooreserver.onrender.com/type`,{
                    method:"GET",
                headers                })
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
