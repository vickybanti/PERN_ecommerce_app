import localStorage from "redux-persist/es/storage";
import {  LOGIN_FAILURE, LOGIN_START, REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "./slice/authSlice";
import { toast } from "react-toastify";
import { addToCart, clearCart, removeFromCart } from "./slice/cartSlice";
import { fetchProducts, productSuccess } from "./slice/ProductSlice";
import {  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config"
import { v5 as uuidv5 } from 'uuid';
import { makeRequest, userRequest } from "../makeRequest";




export const firebaseLogin = async(dispatch) => {
    dispatch(LOGIN_START());
    



const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
      localStorage.setItem('token', token)


    // The signed-in user info.
    const user = result.user;
    const userid = user.uid; // Replace 'your_uid_here' with your actual UID

    const uuid = uuidv5(userid, uuidv5.URL); // Generate a UUID based on the UID using the URL namespace
    
    console.log(uuid); // Print the generated UUID
    console.log(user.displayName)
    const u1 = user.displayName.substring(0,user.displayName.indexOf(" "));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
    
          dispatch(SET_ACTIVE_USER({isLoggedIn:true, 
            userID:uuid,
            email:user.email,
            userName: uName
          }))

          toast.success("Successfully logged in")
          
    
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  
    
  
}

export const login = async (dispatch, user) => {
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer (rnd_aNZ9enklIKwNgICV8oQiMktGR6aj)'
  };
  try {
    dispatch(LOGIN_START());
    console.log(user);

    const response =  await fetch(`https://mooreserver.onrender.com/auth/login`, {
      method:"POST",
      headers,
      body:JSON.stringify(user)
    });
    const parseRes = await response.json();
    console.log(parseRes);

      if (parseRes.token) {
          localStorage.setItem('token', parseRes.token);

          const userEmail = user.email;
          console.log(userEmail);
          console.log(parseRes.firstname);

          dispatch(SET_ACTIVE_USER({
              isLoggedIn: true,
              userID: parseRes.user_id,
              userName: parseRes.firstname,

          }));

          console.log(parseRes.token);
      } else if (!parseRes.user_id) {
          dispatch(LOGIN_FAILURE({
              error: true,
              errorMessage: parseRes.error,
          }));

      }
      else {
          dispatch(LOGIN_FAILURE())
      }
  } catch (error) {
    dispatch(LOGIN_FAILURE({
      error: true,
      errorMessage: "email not found",
    }));
  }
};



export const logout = async(dispatch) => {
  try {
   
    const res = await fetch(`https://mooreserver.onrender.com/auth/logout`)
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
export const addProduct = async(dispatch, item,count,imageData,size) => {
    dispatch(addToCart({...item,count,imageData,size }))

    
    
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
