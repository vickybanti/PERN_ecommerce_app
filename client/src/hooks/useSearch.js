import { useEffect, useState } from "react"

function useSearch() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
   
  useEffect(() => {
    async function fetchData(event) {
        setLoading(true)
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
      };
  
        try {
          const productSearch = await fetch(`http://mooreserver.onrender.com/search/`,{
            method:"GET",
            headers
          });
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
