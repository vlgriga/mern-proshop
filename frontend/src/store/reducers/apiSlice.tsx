import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../assets/constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL }); // using proxy

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Products', 'Orders', 'Users'],
  endpoints: (builder) => ({}),
});
