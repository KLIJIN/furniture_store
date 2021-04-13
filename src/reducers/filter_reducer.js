import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  // debugger;
  let maxPrice;
  let tempProducts = []
  //-------------------------------------------
  switch (action.type) {
    case LOAD_PRODUCTS:
      maxPrice = action.payload.map((product) => product.price); //получаем массив с ценами всех продуктов
      maxPrice = Math.max(...maxPrice);  //возвращаем максимальную цену из входящего массива чисел
      console.log("LOAD_PRODUCTS_maxPrice", maxPrice);
      return {
        ...state,
        all_products: [...action.payload],  //редьюсер возвращает стейт,  а в all_products кладет products из продуктового контекста
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, actual_price: maxPrice }
      };
    //-------------------------------------------
    case SET_GRIDVIEW:
      return { ...state, grid_view: true }
    case SET_LISTVIEW:
      return { ...state, grid_view: false }
    //-------------------------------------------
    case UPDATE_SORT:
      return { ...state, sort: action.payload }
    //===============SORT_PRODUCTS=======================================================
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state
      tempProducts = [...filtered_products]
      if (sort === 'price-lowest') {
        // console.log("price-lowest")
        tempProducts = tempProducts.sort((a, b) => {
          if (a.price < b.price) {
            return -1
          }
          if (a.price > b.price) {
            return 1
          }
          return 0
        })
      }
      if (sort === 'price-highest') {
        // console.log("price-highest")
        tempProducts = tempProducts.sort((a, b) => b.price - a.price)
      }
      if (sort === 'name-a-z') {
        // console.log("name-a-z")
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if (sort === 'name-z-a') {
        // console.log("name-z-a")
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      return { ...state, filtered_products: tempProducts }
    //==============//===SORT_PRODUCTS===//===============================================
    case UPDATE_FILTERS:
      const { name, value } = action.payload
      return { ...state, filters: { ...state.filters, [name]: value } }
    //--------------------------------------------------------------------
    case FILTER_PRODUCTS:
      const { all_products } = state;
      tempProducts = [...all_products];
      console.log("filter_reducer", tempProducts);
      const { text, category, company, color, actual_price, shipping } = state.filters
      // filtering
      // text
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text)
        })
      }
      // category
      if (category !== 'all') {
        tempProducts = tempProducts.filter((product) => product.category === category)
      }
      // company
      if (company !== 'all') {
        tempProducts = tempProducts.filter((product) => product.company === company)
      }
      // colors
      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((productColor) => productColor === color)
        })
      }
      // price
      if (actual_price) {
        tempProducts = tempProducts.filter((product) => product.price <= actual_price)
      }
      // shipping
      if (shipping) {
        tempProducts = tempProducts.filter((product) => product.shipping === true)
      }
      console.log("filter_reducer FILTER_PRODUCTS")
      console.log("filter_reducer", tempProducts);

      return { ...state, filtered_products: tempProducts }
    //--------------------------------------------------------------------
    case CLEAR_FILTERS:
      console.log("filter_reducer CLEAR_FILTERS")
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          actual_price: state.filters.max_price,
          shipping: false,
        },
      }
    default:
      return state;
  }
  // if (action.type === LOAD_PRODUCTS) {
  //   let maxPrice = action.payload.map((p) => p.price)
  //   maxPrice = Math.max(...maxPrice)

  //   return {
  //     ...state,
  //     all_products: [...action.payload],
  //     filtered_products: [...action.payload],
  //     filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
  //   }
  // }
  // if (action.type === SET_GRIDVIEW) {
  //   return { ...state, grid_view: true }
  // }
  // if (action.type === SET_LISTVIEW) {
  //   return { ...state, grid_view: false }
  // }
  // if (action.type === UPDATE_SORT) {
  //   return { ...state, sort: action.payload }
  // }
  // if (action.type === SORT_PRODUCTS) {
  //   const { sort, filtered_products } = state
  //   let tempProducts = [...filtered_products]
  //   if (sort === 'price-lowest') {
  //     tempProducts = tempProducts.sort((a, b) => {
  //       if (a.price < b.price) {
  //         return -1
  //       }
  //       if (a.price > b.price) {
  //         return 1
  //       }
  //       return 0
  //     })
  //   }
  //   if (sort === 'price-highest') {
  //     tempProducts = tempProducts.sort((a, b) => b.price - a.price)
  //   }
  //   if (sort === 'name-a') {
  //     tempProducts = tempProducts.sort((a, b) => {
  //       return a.name.localeCompare(b.name)
  //     })
  //   }
  //   if (sort === 'name-z') {
  //     tempProducts = tempProducts.sort((a, b) => {
  //       return b.name.localeCompare(a.name)
  //     })
  //   }
  //   return { ...state, filtered_products: tempProducts }
  // }
  // if (action.type === UPDATE_FILTERS) {
  //   const { name, value } = action.payload
  //   return { ...state, filters: { ...state.filters, [name]: value } }
  // }
  // if (action.type === FILTER_PRODUCTS) {
  //   const { all_products } = state
  //   const { text, category, company, color, price, shipping } = state.filters

  //   let tempProducts = [...all_products]
  //   // filtering
  //   // text
  //   if (text) {
  //     tempProducts = tempProducts.filter((product) => {
  //       return product.name.toLowerCase().startsWith(text)
  //     })
  //   }
  //   // category
  //   if (category !== 'all') {
  //     tempProducts = tempProducts.filter(
  //       (product) => product.category === category
  //     )
  //   }

  //   // company
  //   if (company !== 'all') {
  //     tempProducts = tempProducts.filter(
  //       (product) => product.company === company
  //     )
  //   }
  //   // colors
  //   if (color !== 'all') {
  //     tempProducts = tempProducts.filter((product) => {
  //       return product.colors.find((c) => c === color)
  //     })
  //   }
  //   // price
  //   tempProducts = tempProducts.filter((product) => product.price <= price)
  //   // shipping
  //   if (shipping) {
  //     tempProducts = tempProducts.filter((product) => product.shipping === true)
  //   }

  //   return { ...state, filtered_products: tempProducts }
  // }
  // if (action.type === CLEAR_FILTERS) {
  //   return {
  //     ...state,
  //     filters: {
  //       ...state.filters,
  //       text: '',
  //       company: 'all',
  //       category: 'all',
  //       color: 'all',
  //       price: state.filters.max_price,
  //       shipping: false,
  //     },
  //   }
  // }


  // throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer