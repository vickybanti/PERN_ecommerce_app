import { useState, useEffect } from "react";
import { SET_USERS } from "../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";


const useFetchUsers = (url) => {
    const dispatch = useDispatch()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(true)
    const users = useSelector((state) =>state.auth.users)
    console.log("users=",users)
    
    
    useEffect(() => {
        const fetchData = async () => {

            try {
                setLoading(true)
    
                const res = await fetch(`http://localhost:5000/users`)
                const json = await res.json()
    
                setData(json)
                dispatch(SET_USERS(json));


                setLoading(false)
    
            } catch (error) {
                setError(true)
            }
            setLoading(false)
    
        }
    
        fetchData();
    }, [url])
    return { data, loading, error};
}

export default useFetchUsers;
