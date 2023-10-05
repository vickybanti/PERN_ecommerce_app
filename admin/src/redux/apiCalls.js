import localStorage from "redux-persist/es/storage";
import { allProducts, deleteProduct } from "./slice/ProductSlice";
import {  LOGIN_FAILURE, LOGIN_START, REMOVE_ACTIVE_USER, SET_ACTIVE_USER, SET_ADMIN, SET_NOT_ADMIN } from "./slice/authSlice";
import { fetchProducts, productSuccess } from "./slice/ProductSlice";
import { addOrder, changeStatus } from "./slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";




    
  

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
      

    const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
      });
      const parseRes = await response.json()
      if (parseRes){
        const response = await fetch(`http://localhost:5000/auth/user/${parseRes.user_id}`,{
          method:"GET"
        });
      const getAdmin = await response.json()
      console.log(getAdmin)

      if(getAdmin && getAdmin.isadmin===true){
       
          localStorage.setItem('token', parseRes.token)
         
           const userEmail = user.email
           console.log(userEmail)
           const u1 = userEmail.substring(0,userEmail.indexOf("@"));
           const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
         
           
           
           
           dispatch(SET_ACTIVE_USER({isLoggedIn:true, 
             userID:parseRes.user_id,
           userName:uName,
           admin:parseRes.isadmin,
            isFetching:false,
         errorMessage:"LOGGING USER IN..."
       }))
 
         
             
 
           console.log(parseRes.token)
      
      
        

      }
      // if (getAdmin.isadmin===false) {
      //     dispatch(LOGIN_FAILURE({error:true,
      //     errorMessage:"USER IS NOT AN ADMIN...",
      //   isFetching:false}))
        
      // }
      
      
           
      } 
      if(!parseRes) {
          dispatch(LOGIN_FAILURE({error:true,
          errorMessage:"INVALID EMAIL/PASSWORD...",
        isFetching:false}))
        
      }
      
      

      
    } catch (error) {
      if(error.res === 500){
      dispatch(LOGIN_FAILURE({error:true,
        errorMessage:"email not found...",
        isFetching:false}))
      } else if(error.res.status ===401) {
        dispatch(LOGIN_FAILURE({error:true,
          errorMessage:"nvalid password",
          isFetching:false}))
      }
    }
  }
  





export const logout = async(dispatch) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/logout`,{
      method:"POST"
    })
    res.json()
    localStorage.removeItem("token")
    dispatch(REMOVE_ACTIVE_USER());
    
  } catch (err) {
    console.error(err.message)      
  }
  };


export const setAdmin = async(dispatch,id) => {
  console.log(id)
  const body = {
    id:id
  }
  
    try {
      const change = await fetch(`http://localhost:5000/users/admin/${id}`,{
        method:"PUT",
        body:JSON.stringify(body),
        headers:{"Content-Type":"application/json"}
      })
      const update = await change.json()

      if(update){
        dispatch(SET_ADMIN({ userID: id }));
      }
    } catch (err) {
      console.error(err.message)
    }

  }





  export const setNotAdmin = async (dispatch, id)=>{
    console.log(id)
  const body = {
    id:id
  }
    try {
      const change = await fetch(`http://localhost:5000/users/notadmin/${id}`,{
        method:"PUT",
        body:JSON.stringify(body),
        headers:{"Content-Type":"application/json"}
      })
      const update = await change.json()

      if(update){
        dispatch(SET_NOT_ADMIN({userID: id }));
      }
    } catch (err) {
      console.error(err.message)
    }

  }
  
 export const changeStatusToDelivered = async(dispatch,id)=> {
    const change = await fetch(`http://localhost:5000/order/status/${id}`,{
      method:"PUT",
      body:JSON.stringify({id:id}),
      headers:{"Content-Type" : "application/json"}
    }
    )
    const changeOrder =  await change.json()

    if(changeOrder){
      dispatch(changeStatus({status:"delivered"}))

      console.log("Status has been changed...")
    }

  }

 export const changeStatusToPending = async(dispatch,id)=> {
    const change = await fetch(`http://localhost:5000/order/status/pending/${id}`,{
      method:"PUT",
      body:JSON.stringify({id:id}),
      headers:{"Content-Type" : "application/json"}
    }
    )
    const changeOrder =  await change.json()

    if(changeOrder){
      dispatch(changeStatus({status:"pending"}))

      console.log("Status has been changed...")
    }

  }


//PRODUCTS

//fetch a product

export const getAllProducts = async(dispatch) => {
  dispatch(fetchProducts())
  try {
    const fetchProduct = await fetch(`http://localhost:5000/products`,{
      method: "GET",
      headers: {"Content-Type": "application/json"},
    })
    const product = await fetchProduct.json()
    console.log(product)
    dispatch(allProducts(product))
    console.log(dispatch(allProducts(product))
    )
  } catch (err) {
    console.error(err.message)
  }
}


//fetch a product

export const getProduct = async(dispatch, id) => {
  dispatch(fetchProducts())
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

//ORDERS
export  const reduceCount = async(dispatch, id) => {
}



//fetch a product



export const deleteProductId = async(dispatch, id) => {
  try {
    await fetch(`http://localhost:5000/product/delete/${id}`,{
      method:"DELETE"
    })
      window.location.reload()
  } catch (err) {
    console.error(err.message)
  }
}


