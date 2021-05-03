import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import ProductsReducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  sidebarOpenAction, sidebarCloseAction, GetProductsBeginAction, GetProductsSuccessAction,
  GetProductsErrorAction, GetSingleProductsBeginAct, GetSingleProductsSuccessAct, GetSingleProductsErrorAct, GetSingleProductsAnmountAct
} from '../actions'


const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {}
}

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  console.log("ProductsProvider ")
  const [state, dispatch] = useReducer(ProductsReducer, initialState)

  const openSidebar = () => {
    dispatch(sidebarOpenAction());
  }

  const closeSidebar = () => {
    dispatch(sidebarCloseAction());
  }


  const fetchProducts = async (url) => {
    dispatch(GetProductsBeginAction()) //пошла загрузка - открыли лоадинг,
    try {
      const response = await axios.get(url)
      const products = response.data
      dispatch(GetProductsSuccessAction(products));
      // console.log("response", response);
    } catch (error) {
      console.log(error);
      dispatch(GetProductsErrorAction());
    }
  }

  //загружает отдельный product
  const fetchSingleProduct = async (url) => {
    dispatch(GetSingleProductsBeginAct())
    try {
      const response = await axios.get(url)
      const singleProduct = response.data
      dispatch(GetSingleProductsSuccessAct(singleProduct))
    } catch (error) {
      dispatch(GetSingleProductsErrorAct())
    }
  }
  const SingleProductsAnmount = () => {
    dispatch(GetSingleProductsAnmountAct())
  }

  useEffect(() => {
    fetchProducts(url);
  }, [])

  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct, SingleProductsAnmount }}>
      {children}
    </ProductsContext.Provider>
  )
}
// Custom Hook ---------------------------------------------------------------------->
export const useProductsContext = () => {
  return useContext(ProductsContext,)
}
