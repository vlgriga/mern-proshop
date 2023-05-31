import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICartProduct } from './types';

export interface CartState {
  list: ICartProduct[];
}

const initialState: CartState = {
  list: [],
};

export const cartSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    addToCart: (state, action: { payload: { product: ICartProduct } }) => {
      const newProduct = action.payload.product;
      const isExist = state.list.find((item) => item._id === newProduct._id);

      if (isExist) {
        state.list = state.list.map((item) =>
          item._id === newProduct._id ? newProduct : item
        );
      } else {
        state.list.push(newProduct);
      }
    },
    removeFromCart: (state, action) => {
      state.list = state.list.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
