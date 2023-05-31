import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from './types';
import axios from 'axios';

export interface UserState {
  userInfo?: IUser;
  loading: Boolean;
  error?: String;
}

const initialState: UserState = {
  loading: false,
};

export const login = createAsyncThunk(
  'user/login',
  async function (params: any, { rejectWithValue }) {
    try {
      const { email, password } = params;
      const resp = await axios.post(
        `/api/users/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (resp.statusText !== 'OK') {
        throw new Error('Server Error!');
      }

      return resp.data;
    } catch (e: any) {
      const message = e.response && e.response.data && e.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async function (params: any, { rejectWithValue }) {
    try {
      const { name, email, password } = params;
      const resp = await axios.post(
        `/api/users`,
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      return resp.data;
    } catch (e: any) {
      const message = e.response && e.response.data && e.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const updateProfileDetails = createAsyncThunk(
  'user/updateDetails',
  async function (params: any, { rejectWithValue }) {
    try {
      const { name, email, password, token } = params;
      const resp = await axios.put(
        `/api/users/profile`,
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return resp.data;
    } catch (e: any) {
      const message = e.response && e.response.data && e.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = undefined;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Register
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // UpdateDetails
    builder.addCase(updateProfileDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(updateProfileDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProfileDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
