import localStorage from "redux-persist/es/storage";
import {  LOGIN_FAILURE, LOGIN_START, REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "./slice/authSlice";
import { toast } from "react-toastify";
import { addToCart, clearCart, removeFromCart, setIsCartOpen } from "./slice/cartSlice";
import { fetchProduct, productSuccess } from "./slice/ProductSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase/config';
import { v5 as uuidv5 } from 'uuid';



export const firebaseLogin = async(dispatch) => {
  dispatch(LOGIN_START());
  const provider = new GoogleAuthProvider();
  
  signInWithPopup(auth, provider)
  .then(async (result) => {
    const userLog = result.user;
    console.log(userLog)
    const  accessToken  = userLog.accessToken
    localStorage.setItem('token', accessToken)
    console.log(accessToken)
    const userid = userLog.uid; // Replace 'your_uid_here' with your actual UID

    const uuid = uuidv5(userid, uuidv5.URL); // Generate a UUID based on the UID using the URL namespace
    
    console.log(uuid); // Print the generated UUID
    console.log(userLog.displayName)
    
          dispatch(SET_ACTIVE_USER({isLoggedIn:true, 
            userID:uuid,
            email:userLog.email,
            userName: userLog.displayName
          }))

          toast.success("Successfully logged in")
          
    
    
  }).catch((error) => {
    // Handle Errors here.
      toast.error(error.message)
      console.error(error.message)
    
  });
}

export const login = async(dispatch, user) => { 


  try {
      dispatch(LOGIN_START());

    const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
      });
      const parseRes = await response.json()
      
        if(parseRes.token){
         localStorage.setItem('token', parseRes.token)
        
          const userEmail = user.email
          console.log(userEmail)
          const u1 = userEmail.substring(0,userEmail.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
        
          
          
          
          dispatch(SET_ACTIVE_USER({isLoggedIn:true, 
            userID:parseRes.user_id,
          userName:uName,
        isFetching:false,
        errorMessage:"LOGGING USER IN..."
      }))

        
            

          console.log(parseRes.token)
      
           
      }
      if(!parseRes.user_id){
        dispatch(LOGIN_FAILURE({error:true,
        errorMessage:"INVALID EMAIL/PASSWORD...",
      isFetching:false}))
      }
    
    
      
    } catch (error) {
      dispatch(LOGIN_FAILURE({error:true,
        errorMessage:error.message,
        isFetching:false}))
      }
  }
  

export const logout = async(dispatch) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/logout`,{
      method:"POST"
    })
    res.json()
    localStorage.removeItem("token")
    dispatch(REMOVE_ACTIVE_USER({errorMessage:"Logging user out..."}));
    
  } catch (err) {
    console.error(err.message)      
  }
  };


export const clearProductsFromCart = (dispatch)=> {
  
    dispatch(clearCart())
  }

   export const deleteCart = async (dispatch, id) => {
    
    try {

      const cart = await fetch(`http://localhost:5000/cart/delete/${id}`, {
        method:"DELETE"
      });
      dispatch(removeFromCart(cart))
    } catch (error) {
      if (error.response.status === 401) {
          console.log(error)
      } else {
        console.log(error);
      }
    }
  };

//fetch a product

export const getProduct = async(dispatch, id) => {
  dispatch(fetchProduct())
  try {
    const fetchProduct = await fetch(`http://localhost:5000/product/${id}`,{
      method: "GET",
        headers: {"Content-Type": "application/json"},
    })
    const product = await fetchProduct.json()
    dispatch(productSuccess(product,id))
  } catch (err) {
    console.error(err.message)
  }
}


//add to cart
export const addProduct = async(dispatch, item, imageData,count,size) => {
    dispatch(addToCart({...item,imageData,count,size }))
    dispatch(setIsCartOpen({}))

}

export const deleteFromCart = async(dispatch,item,id) => {
 
    dispatch(removeFromCart(item, id))
}

//ORDERS

