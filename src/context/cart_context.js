import React, { useContext, useReducer, createContext, useEffect } from 'react'
import CartReducer from '../reducers/cart_reducer'
import { ADD_TO_CART, addToCartAction } from '../actions'
import {
  REMOVE_CART_ITEM, removeCartAction,
  TOGGLE_CART_ITEM_AMOUNT, toggleCartItemAmountAct,
  CLEAR_CART, clearCartAction,
  COUNT_CART_TOTALS, countCartTotalsActon,
} from '../actions'
import { GiOverlordHelm } from 'react-icons/gi';



const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"))
  } else {
    return []
  }
}


const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534
}


const CartContext = createContext()

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (id, color, amount, product) => {
    console.log("CartProvider", id, color, amount, product);
    dispatch(addToCartAction(id, color, amount, product));
  }

  //remove item удолить позицию
  const removeItem = (id) => {
    dispatch(removeCartAction(id)); //REMOVE_CART_ITEM
  };

  //очистить корзину
  const clearCart = () => {
    dispatch(clearCartAction()); //CLEAR_CART
  };

  //toggleAmount плюс/минус
  const toggleAmount = (id, value) => {
    dispatch(toggleCartItemAmountAct(id, value)); //TOGGLE_AMOUNT
  }

  useEffect(() => {
    //при каждом изменении массива продуктов корзины state.cart  корзина записывается в сторадж
    localStorage.setItem("cart", JSON.stringify(state.cart));
    dispatch(countCartTotalsActon()); // COUNT_CART_TOTALS
  }, [state.cart])

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
