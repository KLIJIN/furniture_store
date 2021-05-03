export const SIDEBAR_OPEN = 'SIDEBAR_OPEN'
export const SIDEBAR_CLOSE = 'SIDEBAR_CLOSE'

export const GET_PRODUCTS_BEGIN = 'GET_PRODUCTS_BEGIN'
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR'

export const GET_SINGLE_PRODUCT_BEGIN = 'GET_SINGLE_PRODUCT_BEGIN'
export const GET_SINGLE_PRODUCT_SUCCESS = 'GET_SINGLE_PRODUCT_SUCCESS'
export const GET_SINGLE_PRODUCT_ANMOUNT = 'GET_SINGLE_PRODUCT_ANMOUNT'
export const GET_SINGLE_PRODUCT_ERROR = 'GET_SINGLE_PRODUCT_ERROR'

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS'

export const SET_GRIDVIEW = 'SET_GRIDVIEW'
export const SET_LISTVIEW = 'SET_LISTVIEW'


export const UPDATE_SORT = 'UPDATE_SORT'
export const SORT_PRODUCTS = 'SORT_PRODUCTS'

export const UPDATE_FILTERS = 'UPDATE_FILTERS'
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS'
export const CLEAR_FILTERS = 'CLEAR_FILTERS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
export const TOGGLE_CART_ITEM_AMOUNT = 'TOGGLE_CART_ITEM_AMOUNT'
export const CLEAR_CART = 'CLEAR_CART'
export const COUNT_CART_TOTALS = 'COUNT_CART_TOTALS'





export const sidebarOpenAction = () => {
  return (
    { type: SIDEBAR_OPEN }
  )
}

export const sidebarCloseAction = () => {
  return {
    type: SIDEBAR_CLOSE
  }
}

export const GetProductsBeginAction = () => {
  return { type: GET_PRODUCTS_BEGIN }
}

export const GetProductsSuccessAction = (products) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: products
  }
}


export const GetProductsErrorAction = () => {
  return (
    { type: GET_PRODUCTS_ERROR }
  )
}




export const GetSingleProductsBeginAct = () => {
  return (
    { type: GET_SINGLE_PRODUCT_BEGIN }
  )
}

export const GetSingleProductsSuccessAct = (singleProduct) => {
  return {
    type: GET_SINGLE_PRODUCT_SUCCESS,
    payload: singleProduct
  }
}

export const GetSingleProductsAnmountAct = () => {
  return {
    type: GET_SINGLE_PRODUCT_ANMOUNT,
  }
}



export const GetSingleProductsErrorAct = () => {
  return (
    { type: GET_SINGLE_PRODUCT_ERROR }
  )
}

export const loadProductsAction = (products) => {
  return {
    type: LOAD_PRODUCTS,
    payload: products
  }
}


export const setGridViewAction = () => {
  return { type: SET_GRIDVIEW }
}

export const setListViewAction = () => {
  return { type: SET_LISTVIEW }
}


export const updateSortAction = (value) => {
  return {
    type: UPDATE_SORT,
    payload: value
  }
}

export const sortProductsAction = () => {
  return { type: SORT_PRODUCTS }
}



export const updateFiltersAction = ({ name, value }) => {
  return {
    type: UPDATE_FILTERS,
    payload: { name, value }
  }
}

export const filterProductsAction = () => {
  return { type: FILTER_PRODUCTS }
}


export const clearFiltersAction = () => {
  return { type: CLEAR_FILTERS }
}


export const addToCartAction = (id, color, amount, product) => {
  return {
    type: ADD_TO_CART,
    payload: { id, color, amount, product }
  }
}


export const removeCartAction = (id) => {
  return {
    type: REMOVE_CART_ITEM,
    payload: id

  }
}

export const clearCartAction = () => {
  return { type: CLEAR_CART }
}


export const toggleCartItemAmountAct = (id, value) => {
  return {
    type: TOGGLE_CART_ITEM_AMOUNT,
    payload: { id, value }
  }
}


export const countCartTotalsActon = () => {
  return { type: COUNT_CART_TOTALS }
}

