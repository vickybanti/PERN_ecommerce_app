import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email:null,
    userName:null,
    userID: null,
    isFetching: false,
    errorMessage:null,
    error:false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    SET_USERS(state,action){
      state.users = action.payload
    },
    
    LOGIN_START (state) {
      state.isFetching=true
      state.error = false
      state.errorMessage = null
      state.userID = null
      state.email = null
      
    },



 
    SET_ACTIVE_USER (state, action) {
  
      
        const {email, userName, userID} = action.payload
        state.isLoggedIn = true
        state.email = email
        state.userName = userName
        state.userID = userID
        state.isFetching = false
        state.error=true
        state.errorMessage=action.payload
    },

    LOGIN_FAILURE(state, action){
      state.isLoggedIn=false
      state.email=null
      state.userID = null
      state.isFetching=false
      state.error=true
      state.errorMessage=action.payload
    },

  

    REMOVE_ACTIVE_USER: (state)=> {
        state.isLoggedIn = false
        state.email = null
        state.userName = null
        state.userID = null
        state.error = false
        state.errorMessage = null
    }
  }
});

export const {SET_USERS,LOGIN_START, LOGIN_SUCCESS,LOGIN_FAILURE,SET_ACTIVE_USER, REMOVE_ACTIVE_USER,SET_ADMIN,SET_NOT_ADMIN} = authSlice.actions
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selecttUserEmail = (state) => state.auth.email
export const selectUserID = (state) => state.auth.userID
export const selectUserName = (state) => state.auth.userName


export default authSlice.reducer