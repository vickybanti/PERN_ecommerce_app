import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn, REMOVE_ACTIVE_USER, SET_ACTIVE_USER, selectUserName } from '../redux/slice/authSlice'
import { logout } from '../redux/apiCalls';

const dispatch = useDispatch

const ShowOnLogin = ({children})  => {

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const loggedIn = useSelector((state) => state.auth.isLoggedIn)
    const userName = useSelector(selectUserName)

    if (isLoggedIn) {
        dispatch(SET_ACTIVE_USER({userName:userName}))
        return children
    } else {
        return null
    }
  
}

export const ShowOnLogout = ({children})  => {

    const loggedIn = useSelector(selectIsLoggedIn);

    if (!loggedIn) {
        dispatch(REMOVE_ACTIVE_USER)
        return children
    } else {
        return null
    }
  
}



export default ShowOnLogin
