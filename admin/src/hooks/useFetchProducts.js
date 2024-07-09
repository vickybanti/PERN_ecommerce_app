import { useState, useEffect } from "react";
import { makeRequest } from "../makeRequest";


const useFetchProducts = (url) => {
    const [allProducts, setProduct] = useState([]);
    const [loadProduct, setLoading] = useState(null)
    const [productError, setError] = useState(true)
    console.log(allProducts)

    
    

    const fetchData = async () => {

        try {
            setLoading(true)

            const res = await makeRequest.get(`/products`)
            const json = await res.data;

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
