import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  loadProductsAction,
  setGridViewAction,
  setListViewAction,
  updateSortAction,
  sortProductsAction,
  updateFiltersAction,
  FILTER_PRODUCTS,
  filterProductsAction,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    actual_price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {

  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //при загрузке контекста импортируем в редьюсере массив products из ProductsContext в массив filtered_products
    dispatch(loadProductsAction(products));
  }, [products])

  useEffect(() => {
    dispatch(filterProductsAction())  //FILTER_PRODUCTS
    dispatch(sortProductsAction())   //SORT_PRODUCTS
  }, [products, state.sort, state.filters])

  //SET_GRID-VIEW        
  const setGridView = () => {
    dispatch(setGridViewAction())
  }
  //SET_LIST-VIEW
  const setListView = () => {
    dispatch(setListViewAction())
  }

  //UPDATE_SORT
  const updateSort = (e) => {
    const value = e.target.value;
    dispatch(updateSortAction(value))
  }
  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value

    if (name === 'category') {
      //у кнопок button нет target.value
      value = e.target.textContent
    }
    if (name === 'color') {
      value = e.target.dataset.color
    }
    if (name === 'price') {
      value = Number(value)
      // name = "actual_price"
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    console.log("updateFilters", name, value);
    dispatch(updateFiltersAction({ name, value })) //UPDATE_FILTERS
  }
  const clearFilters = () => {
    console.log("clearFilters");
    dispatch({ type: CLEAR_FILTERS })
  }
  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort, updateFilters, clearFilters, }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}