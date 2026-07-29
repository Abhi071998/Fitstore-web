import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_BASE_URL
export const fitstoreApi = createApi({
  reducerPath: 'fitstoreApi', // Unique key in the store to hold cached API data
  
  // BASE QUERY: Configures the base URL and default headers for all requests
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, // Your Go Echo Backend URL
    
    // prepareHeaders runs BEFORE every API request
    prepareHeaders: (headers, { getState }) => {
      // Read the current JWT token directly from the Redux auth state
      const token = getState().auth.token;
      
      // If token exists, attach it as a Bearer token to authorize requests
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // TAG TYPES: Used for automatic cache clearing (e.g. invalidating 'Products' after creating one)
  tagTypes: ['Products', 'Orders'],

  // ENDPOINTS: Define your API routes here
  endpoints: (builder) => ({
    
    // LOGIN MUTATION: Use "mutation" for POST/PUT/DELETE requests (data changes)
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',  // Combines with baseUrl -> http://localhost:8080/api/v1/auth/login
        method: 'POST',      // HTTP method
        body: credentials,  // Payload sent to backend: { email, password }
      }),
    }),

    // GET PRODUCTS QUERY: Use "query" for GET requests (fetching data)
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),
  }),
});

// AUTO-GENERATED HOOKS: RTK Query creates these automatically based on endpoint names!
// - login endpoint       -> useLoginMutation
// - getProducts endpoint  -> useGetProductsQuery
export const { useLoginMutation, useGetProductsQuery } = fitstoreApi;