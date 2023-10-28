import { createSlice } from '@reduxjs/toolkit'
import { ProductCartItem } from 'src/types/product.type'

export type State = {
  products: ProductCartItem[]
  checkoutProducts: ProductCartItem[]
}
const initialState: State = {
  products: [],
  checkoutProducts: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload._id)

      if (item) {
        item.quantity += action.payload.quantity
      } else {
        state.products.push(action.payload)
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload._id)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.products = state.products.filter((item) => item._id !== action.payload._id)
        }
      }
    },
    removeItemFromCart: (state, action) => {
      state.products = state.products.filter((item) => !action.payload?.includes(item._id))
    },
    resetCart: (state, action) => {
      state.products = []
    },
    addToCheckoutCart: (state, action) => {
      state.checkoutProducts = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart, decreaseQuantity, removeItemFromCart, resetCart, addToCheckoutCart } = cartSlice.actions

export default cartSlice.reducer
