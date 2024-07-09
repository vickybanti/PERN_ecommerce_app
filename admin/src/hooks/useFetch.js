import { useState, useEffect } from "react";
import { makeRequest } from "../makeRequest";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Just make the request without manually setting CORS headers
                const res = await makeRequest.get('/trending');
                const jsonData = res.data;

                setData(jsonData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
