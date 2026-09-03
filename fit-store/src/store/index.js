import { configureStore } from '@reduxjs/toolkit';
import { fitstoreApi } from './api/baseApi';
import authReducer from './slices/authSlice';

// Each domain file below injects its endpoints into fitstoreApi as a side
// effect of being imported — keep them imported here so every endpoint is
// registered before the store is used.
import './api/authApi';
import './api/productsApi';
import './api/categoriesApi';
import './api/categoryTypesApi';
import './api/ordersApi';
import './api/contentApi';
import './api/heroApi';

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
