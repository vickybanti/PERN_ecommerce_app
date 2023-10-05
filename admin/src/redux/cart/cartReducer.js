import { ADD_TO_CART } from "./cartType"
const initialState = {
    cart: 0
}

const cartReducer = (state=initialState, action) => {
    switch(action.type){
        case ADD_TO_CART: return {
            ...state,
            cart: state.cart + action.payload
        }
        default : return state
    }
}

export default cartReducer