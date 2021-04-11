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


  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);  //возвращаем максимальный прайс из загруженных товаров
      console.log("maxPrice", maxPrice);
      return {
        ...state,
        all_products: [...action.payload],  //редьюсер возвращает стейт,  а в all_products кладет products из продуктового контекста
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, actual_price: maxPrice }
      };

    case SET_GRIDVIEW:
      return { ...state, grid_view: true }
    case SET_LISTVIEW:
      return { ...state, grid_view: false }
    case UPDATE_SORT:
      return { ...state, sort: action.payload }

    case SORT_PRODUCTS:
      const { sort, filtered_products } = state
      let temp_Products = [...filtered_products]
      if (sort === 'price-lowest') {
        temp_Products = temp_Products.sort((a, b) => {
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
        temp_Products = temp_Products.sort((a, b) => b.price - a.price)
      }
      if (sort === 'name-a') {
        temp_Products = temp_Products.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if (sort === 'name-z') {
        temp_Products = temp_Products.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      return { ...state, filtered_products: temp_Products }

    case UPDATE_FILTERS:
      const { name, value } = action.payload
      return { ...state, filters: { ...state.filters, [name]: value } }

    case FILTER_PRODUCTS:
      const { all_products } = state
      const { text, category, company, color, price, shipping } = state.filters

      let tempProducts = [...all_products]
      // filtering
      // text
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text)
        })
      }
      // category
      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        )
      }

      // company
      if (company !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        )
      }
      // colors
      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === color)
        })
      }
      // price
      tempProducts = tempProducts.filter((product) => product.price <= price)
      // shipping
      if (shipping) {
        tempProducts = tempProducts.filter((product) => product.shipping === true)
      }

      return { ...state, filtered_products: tempProducts }

    case CLEAR_FILTERS:
      console.log("CLEAR_FILTERS") //прописываем хардкодом в стейт изначальное значение из контекста
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      }

    default:
      return state;
  }



  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer