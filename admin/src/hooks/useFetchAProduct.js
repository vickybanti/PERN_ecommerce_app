import { useState, useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom';
import { makeRequest } from "../makeRequest";


const useFetchAProduct = () => {
    const {id} = useParams();

    const [proData, setPro] = useState([]);
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(true)
    
    const [imageData, setImageData] = useState(null);

  
    const processImages = useCallback(async (proImages) => {
      if (proImages && proImages.length > 0) {
        const newImageDataArray = [];
    
        for (const image of proImages) {
          for (const img of image) {
            const byteArray = new Uint8Array(img.data);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });
    
            const base64Image = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
    
            newImageDataArray.push(base64Image);
          }
        }
    
        setImageData(newImageDataArray);
      } else {
        setImageData([]);
      }
    }, []);
    
    useEffect(() => {
      const proImages = proData.map((item) => item.images);
      processImages(proImages);
    }, [proData, processImages]);
    


    useEffect(() => {
        const fetchData = async () => {

            try {
                setLoading(true)
                
                const res = await makeRequest.get(`/product/${id}`)
                const json = await res.data;
                setPro(json)
                setLoading(false)
    
            } catch (error) {
                setError(true)
            }
            setLoading(false)
    
        }
        fetchData();
    }, [id])
    return { proData, loading, error, imageData};
}

export default useFetchAProduct;
