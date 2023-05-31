import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct } from './types';
import axios from 'axios';

export interface ProductListState {
  list: Array<IProduct>;
  loading: Boolean;
  error?: any;
}

const initialState: ProductListState = {
  list: [],
  loading: false,
};

export const fetchProductList = createAsyncThunk(
  'products/fetchProductList',
  async function (_, { rejectWithValue }) {
    try {
      const resp: any = await axios.get('/api/products');

      if (resp.statusText !== 'OK') {
        throw new Error('Server Error!');
      }

      return resp.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    increment: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchProductList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment } = productListSlice.actions;

export default productListSlice.reducer;
