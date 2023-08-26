import { ADD_TO_CART } from "./cartType"

export const AddToCart = (number = 1) => {
    const ADD_TO_CART = "ADD_TO_CART"
    return {
        type:ADD_TO_CART,
        payload: number
    }
}

