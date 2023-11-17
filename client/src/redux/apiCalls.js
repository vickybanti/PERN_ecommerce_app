import localStorage from "redux-persist/es/storage";
import {  LOGIN_FAILURE, LOGIN_START, REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "./slice/authSlice";
import { toast } from "react-toastify";
import { addToCart, clearCart, removeFromCart, setIsCartOpen } from "./slice/cartSlice";
import { fetchProducts, productSuccess } from "./slice/ProductSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase/config';
import { v5 as uuidv5 } from 'uuid';
import { useState } from "react";
import { useSelector } from "react-redux";
import useFetchProducts from "../hooks/useFetchProducts";
import { makeRequest } from "../makeRequest";



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

       
  function res(response) {
    if (response.status === 500) {
      dispatch(LOGIN_FAILURE({error:true,
        errorMessage:"email not found...",
      isFetching:false})); // Response text ("email is incorrect")
    } else if (response.status === 401) {
      dispatch(LOGIN_FAILURE({error:true,
        errorMessage:"wrong password...",
      isFetching:false}))
    } 
  }


  try {
      dispatch(LOGIN_START());
      
    const response = await makeRequest.post("/auth/login", JSON.stringify(user));
      const parseRes = await response.data
      console.log(parseRes)
      
        if(parseRes.token){
         localStorage.setItem('token', parseRes.token)
        
          const userEmail = user.email
          
          console.log(userEmail)
          console.log(parseRes.firstname)
          // const u1 = userEmail.substring(0,userEmail.indexOf("@"));
          // const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
        
          
          
          
          dispatch(SET_ACTIVE_USER({isLoggedIn:true, 
            userID:parseRes.user_id,
          userName:parseRes.firstname,
        isFetching:false,
        errorMessage:"LOGGING USER IN..."
      }))

        
            

          console.log(parseRes.token)
      
           
      }
      if(!parseRes.user_id){
        dispatch(LOGIN_FAILURE({error:true,
        errorMessage:"INVALID EMAIL/PASSWORD...",
      isFetching:false}))
      } else {
        res(response)
      }
      

      
    } catch (error) {
      dispatch(LOGIN_FAILURE({error:true,
        errorMessage:"email not found",
        isFetching:false}))
      }
  }
  

export const logout = async(dispatch) => {
  try {
   
    const res = await fetch(`http://localhost:5000/auth/logout`)
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
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
    };


      const cart = await fetch(`https://mooreserver.onrender.com/cart/delete/${id}`, {
        method:"DELETE",
        headers
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




//add to cart
export const addProduct = async(dispatch, item,count,size) => {
    dispatch(addToCart({...item,count,size }))

    
    
}

export const deleteFromCart = async(dispatch,item,id) => {
 
    dispatch(removeFromCart(item, id))
}

//PRODUCTS

//fetch a product

export const getAllProducts = async(dispatch) => {
  dispatch(fetchProducts())
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
};
  try {
    const fetchProduct = await fetch(`https://mooreserver.onrender.com/products`,{
      method: "GET",
        headers,
    })
    const product = await fetchProduct.data
    dispatch(productSuccess(product))
  } catch (err) {
    console.error(err.message)
  }
}


//fetch a product

export const getProduct = async(dispatch, id) => {
  dispatch(fetchProducts())
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
};
  try {
    const fetchProduct = await fetch(`https://localhost:5000/product/${id}`,{
      method: "GET",
        headers
    })
    const product = await fetchProduct.data
    dispatch(productSuccess(product,id))
  } catch (err) {
    console.error(err.message)
  }
}

//ORDERS
export  const reduceCount = async(dispatch, id) => {
}
