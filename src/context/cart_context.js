import React, { useContext, useReducer, createContext } from 'react'
import CartReducer from '../reducers/cart_reducer'
import { ADD_TO_CART, addToCartAction } from '../actions'
//import { REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT, CLEAR_CART, COUNT_CART_TOTALS, } from '../actions'

const initialState = {
  cart: [],
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534
}

const CartContext = createContext()

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (id, color, amount, product) => {
    console.log("CartProvider", id, color, amount, product);
    dispatch(addToCartAction(id, color, amount, product))
  }

  //remove item удолить позицию
  const removeItem = (id) => { }

  //toggleAmount   плюс/минус

  const toggleAmount = (id, value) => {

  }

  //очистить корзину
  const clearCart = () => { }

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
