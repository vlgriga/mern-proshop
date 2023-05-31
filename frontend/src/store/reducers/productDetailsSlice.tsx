import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct } from './types';
import axios from 'axios';

export interface ProductDetailsState {
  product?: IProduct;
  loading: Boolean;
  error?: String;
}

const initialState: ProductDetailsState = {
  loading: false,
};

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async function (id: string, { rejectWithValue }) {
    try {
      const resp = await axios.get(`/api/products/${id}`);

      if (resp.statusText !== 'OK') {
        throw new Error('Server Error!');
      }

      return resp.data;
    } catch (e: any) {
      console.log(e.message);
      return rejectWithValue(e.message);
    }
  }
);

export const productDetailsSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
