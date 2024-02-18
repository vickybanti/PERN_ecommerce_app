import { useEffect, useState } from "react"
import { makeRequest } from "../../../client/src/makeRequest"

function useSearch() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
   
  useEffect(() => {
    async function fetchData(event) {
        setLoading(true)
  
        try {
          const productSearch = await makeRequest.get(`/search/`);
          const productResponse = await productSearch.data;
  
          setProducts(productResponse)
        } catch (err) {
          console.error(err.message);
        }
    }
    fetchData()

  }, [])
    

  return {products, loading};

      
    }
  


export default useSearch
