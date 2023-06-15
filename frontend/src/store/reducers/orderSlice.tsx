import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface OrderState {
  orderItem?: any;
  ordersList?: any;
  error: string;
  loading: boolean;
}

const initialState: OrderState = {
  ordersList: [],
  error: '',
  loading: false,
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async function (params: any, { rejectWithValue }) {
    try {
      const resp = await axios.post(`/api/orders`, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params.token}`,
        },
      });

      return resp.data;
    } catch (e: any) {
      console.log(e.message);
      return rejectWithValue(e.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async function ({ id, token }: any, { rejectWithValue }) {
    try {
      const resp = await axios.get(`/api/orders/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return resp.data;
    } catch (e: any) {
      console.log(e.message);
      return rejectWithValue(e.message);
    }
  }
);

export const payOrder = createAsyncThunk(
  'order/getOrderById',
  async function ({ params, token }: any, { rejectWithValue }) {
    try {
      const resp = await axios.put(
        `/api/orders/${params.orderId}/pay`,
        params.paymentResult,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return resp.data;
    } catch (e: any) {
      console.log(e.message);
      return rejectWithValue(e.message);
    }
  }
);

export const getOrdersList = createAsyncThunk(
  'order/getMyOrders',
  async function (token: any, { rejectWithValue }) {
    try {
      const resp = await axios.get(`/api/orders/mine`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return resp.data;
    } catch (e: any) {
      console.log(e.message);
      return rejectWithValue(e.message);
    }
  }
);

export const cartSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Order
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orderItem = action.payload;
    });
    builder.addCase(createOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Order By id
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.orderItem = action.payload;
    });
    builder.addCase(getOrderById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Orders List
    builder.addCase(getOrdersList.fulfilled, (state, action) => {
      state.loading = false;
      state.ordersList = action.payload;
    });
    builder.addCase(getOrdersList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrdersList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// export const {} = cartSlice.actions;
export default cartSlice.reducer;
