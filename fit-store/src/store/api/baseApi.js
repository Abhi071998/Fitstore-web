import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// BASE API: Shared RTK Query instance. Domain-specific endpoint files
// (see ./authApi, ./productsApi, etc.) inject their endpoints into this.
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
  tagTypes: ['Products', 'Orders', 'Category', 'Content', 'CategoryType'],

  // Endpoints are added via injectEndpoints() in the domain-specific files
  endpoints: () => ({}),
});
