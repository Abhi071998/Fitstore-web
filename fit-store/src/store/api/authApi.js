import { fitstoreApi } from './baseApi';

export const authApi = fitstoreApi.injectEndpoints({
  endpoints: (builder) => ({
    // LOGIN MUTATION: Use "mutation" for POST/PUT/DELETE requests (data changes)
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login', // Combines with baseUrl -> http://localhost:8080/api/v1/auth/login
        method: 'POST',
        body: credentials, // Payload sent to backend: { email, password }
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
