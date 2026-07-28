import { configureStore } from '@reduxjs/toolkit';
import { fitstoreApi } from './apiSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    // 1. Plain Redux state for Auth (user info, token)
    auth: authReducer, 
    
    // 2. RTK Query state for API caching and requests
    [fitstoreApi.reducerPath]: fitstoreApi.reducer, 
  },

  // MIDDLEWARE: Enables RTK Query features like caching, polling, and automatic refetching
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fitstoreApi.middleware),
});