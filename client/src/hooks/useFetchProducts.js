import { useState, useEffect } from "react";
import { makeRequest } from "../makeRequest";


const useFetchProducts = (url) => {
    const [allProducts, setProduct] = useState([]);
    const [loadProduct, setLoading] = useState(null)
    const [productError, setError] = useState(true)
    
    
    

    const fetchData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
        };

        try {
            setLoading(true)

            const res = await fetch(`https://mooreserver.onrender.com/products`,{
                method:"GET",
                headers
            })
            const json = await res.json()

            setProduct(json)
            setLoading(false)

        } catch (error) {
            setError(true)
        }
        setLoading(false)

    }

    useEffect(() => {
        fetchData();
    }, [])
    return { allProducts, loadProduct, productError};
}

export default useFetchProducts;
