
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Leave'],
  endpoints: (builder) => ({
 
    getUsers: builder.query({
      query: () => 'users', 
      providesTags: ['User'], 
    }),
    getLeaves: builder.query({
      query: () => 'leaves', 
      providesTags: ['Leave'], 
    }),
  }),
});
