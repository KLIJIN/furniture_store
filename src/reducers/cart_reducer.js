import {
  ADD_TO_CART,
  // CLEAR_CART,
  // COUNT_CART_TOTALS,
  // REMOVE_CART_ITEM,
  // TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  let tempItem;
  console.log("cart_reducer__state", state)
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

    default:
      return state;

    // throw new Error(`No Matching "${action.type}" - action type`)
  }
}
export default cart_reducer
