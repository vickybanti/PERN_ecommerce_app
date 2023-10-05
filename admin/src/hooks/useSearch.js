import { useEffect, useState } from "react"

function useSearch() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
   
  useEffect(() => {
    async function fetchData(event) {
        setLoading(true)
  
        try {
          const productSearch = await fetch(`http://localhost:5000/search/`);
          const productResponse = await productSearch.json();
  
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
