import { createSlice } from '@reduxjs/toolkit';

// 1. READ SAVED SESSION: Check if a token/user already exists in local storage
const initialToken = localStorage.getItem('adminToken') || null;
const initialUser = localStorage.getItem('adminUser')
  ? JSON.parse(localStorage.getItem('adminUser'))
  : null;

const authSlice = createSlice({
  name: 'auth', // Name of this state slice in the store

  // 2. INITIAL STATE: The starting shape of our auth state
  initialState: {
    user: initialUser,
    token: initialToken,
    isAuthenticated: !!initialToken, // Automatically true if token exists
  },

  // 3. REDUCERS: Plain Redux functions that directly modify state
  reducers: {
    // Action 1: Runs after successful login to save credentials
    setCredentials: (state, action) => {
      const { user, token } = action.payload; // Extract payload passed to dispatch

      // Update Redux Store
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // Save to Browser Storage so user stays logged in after refresh
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(user));
    },

    // Action 2: Runs when the user logs out
    logout: (state) => {
      // Clear Redux Store
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear Browser Storage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    },
  },
});
// Export actions so components can dispatch them: dispatch(setCredentials(...))
export const { setCredentials, logout } = authSlice.actions;

// Export reducer to mount inside store/index.js
export default authSlice.reducer;
