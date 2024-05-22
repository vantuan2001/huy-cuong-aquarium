import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item.id === action.payload.productId
      );
      if (item) {
        item.quantity = +action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },

    updateCart: (state, action) => {
      const item = state.products.find(
        (item) => item.id === action.payload.productId
      );
      if (item) {
        item.quantity = +action.payload.quantity;
      }
    },

    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, updateCart, removeItem, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
