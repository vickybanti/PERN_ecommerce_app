import { useState, useEffect } from "react";


const useFetchProducts = (url) => {
    const [allProducts, setProduct] = useState([]);
    const [loadProduct, setLoading] = useState(null)
    const [productError, setError] = useState(true)
    console.log(allProducts)

    
    

    const fetchData = async () => {

        try {
            setLoading(true)

            const res = await fetch(`http://localhost:5000/products`)
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
