import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../slices/authSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const rawBaseQuery = fetchBaseQuery({
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
});

// Wraps the raw query so an expired/invalid token (401) logs the admin out
// and surfaces a clear message instead of whatever the backend happened to send.
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(logout());
    result.error.data = {
      ...(typeof result.error.data === 'object' ? result.error.data : {}),
      message: 'Your session has expired. Please log in again.',
    };
  }

  return result;
};

// BASE API: Shared RTK Query instance. Domain-specific endpoint files
// (see ./authApi, ./productsApi, etc.) inject their endpoints into this.
export const fitstoreApi = createApi({
  reducerPath: 'fitstoreApi', // Unique key in the store to hold cached API data

  // BASE QUERY: Handles auth headers and, on a 401, logs out + rewrites the error message
  baseQuery: baseQueryWithReauth,

  // TAG TYPES: Used for automatic cache clearing (e.g. invalidating 'Products' after creating one)
  tagTypes: ['Products', 'Orders', 'Category', 'Content', 'CategoryType', 'Hero'],

  // Endpoints are added via injectEndpoints() in the domain-specific files
  endpoints: () => ({}),
});
