import { ADD_TO_CART, CLEAR_CART, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT, COUNT_CART_TOTALS, } from '../actions'

const cart_reducer = (state, action) => {
  let tempItem;
  let tempCarts;
  // console.log("cart_reducer__state", state);
  // console.log("ADD_TO_CART reducer", action.payload);
  // cart это корзина заказов.
  switch (action.type) {
    case ADD_TO_CART:
      console.log("ADD_TO_CART reducer", action.payload)
      const { id, color, amount, product } = action.payload
      tempItem = state.cart.find((item) => item.id === id + color)
      //тут мы ищем в корзине item совпадающий с id + color из переданного пейлоада от filter_products 
      //Если в корзине такой товар есть, то хз, если нету, то добавляем в корзину заказов переданный пейлоад от filter_products 
      console.log("ADD_TO_CART reducer", tempItem)
      if (tempItem) {
        const tempCarts = state.cart.map(cartItem => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount
            console.log("newAmount", newAmount)
            console.log("amount", amount)
            console.log("max", cartItem.max)
            if (newAmount + amount >= cartItem.max) {  //проверка на превышение максимума
              newAmount = cartItem.max
            } else {
              newAmount = cartItem.amount + amount
            }
            console.log("newAmount", newAmount)
            return { ...cartItem, amount: newAmount }
          } else {
            return cartItem
          }
        })

        return { ...state, cart: tempCarts }
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        }
        return { ...state, cart: [...state.cart, newItem] }
      }
    //--------------------------------------------------------------------------------------------------------
    case REMOVE_CART_ITEM:
      //тут возвращаем массив карт, где id не равен пэйлоаду
      tempCarts = state.cart.filter(cartItem => cartItem.id !== action.payload)
      return { ...state, cart: tempCarts }
    //--------------------------------------------------------------------------------------------------------
    case CLEAR_CART:
      //тут возвращаем просто пустой массив карт
      return { ...state, cart: [] }
    //--------------------------------------------------------------------------------------------------------
    case TOGGLE_CART_ITEM_AMOUNT:
      const { id: idPayload, value } = action.payload;
      tempCarts = state.cart.map(item => {
        if (item.id === idPayload) {
          if (value > 0) {
            let newAmount = item.amount + 1
            if (newAmount > item.max) {
              newAmount = item.max
            }
            return { ...item, amount: newAmount }
          } else if (value < 0) {
            let newAmount = item.amount - 1
            if (newAmount < 1) {
              newAmount = 1
            }
            return { ...item, amount: newAmount }
          }
        }
        return item;
      })
      return { ...state, cart: tempCarts }
    //--------------------------------------------------------------------------------------------------------
    case COUNT_CART_TOTALS:
      //тут возвращаем просто пустой массив карт
      const { total_items, total_amount } = state.cart.reduce((total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += price * amount;
        return total
      }, {
        total_items: 0,
        total_amount: 0
      })
      return { ...state, total_items, total_amount }
    //--------------------------------------------------------------------------------------------------------
    default:
      return state;

    // throw new Error(`No Matching "${action.type}" - action type`)
  }
}
export default cart_reducer



