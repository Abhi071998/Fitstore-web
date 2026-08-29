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
  tagTypes: ['Products', 'Orders', 'Category', 'Content', 'CategoryType'],

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

    // GET ALL CATEGORIES
    getCategories: builder.query({
      query: () => '/categories/getAllCategories',
      providesTags: ['Category'],
    }),

    // GET ALL PRODUCTS FOR A CATEGORY
    getProductsByCategory: builder.query({
      query: (categoryId) => `/products/getAllProducts/${categoryId}`,
      providesTags: ['Products'],
    }),

    // GET ALL CATEGORY TYPES (for the category type dropdown)
    getCategoryTypes: builder.query({
      query: () => '/categoryTypes/getAllCategoryTypes',
      providesTags: ['CategoryType'],
    }),

    // CREATE CATEGORY TYPE
    createCategoryType: builder.mutation({
      query: (categoryType) => ({
        url: '/categoryTypes/createCategoryType',
        method: 'POST',
        body: categoryType,
      }),
      invalidatesTags: ['CategoryType'],
    }),

    // UPDATE CATEGORY TYPE
    updateCategoryType: builder.mutation({
      query: ({ id, ...categoryType }) => ({
        url: `/categoryTypes/updateCategoryType/${id}`,
        method: 'PUT',
        body: categoryType,
      }),
      invalidatesTags: ['CategoryType'],
    }),

    // DELETE CATEGORY TYPE
    deleteCategoryType: builder.mutation({
      query: (id) => ({
        url: `/categoryTypes/deleteCategoryType/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CategoryType'],
    }),

    // CREATE CATEGORY
    createCategory: builder.mutation({
      query: (category) => ({
        url: '/categories/createCategory',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Category'],
    }),

    // UPDATE CATEGORY
    updateCategory: builder.mutation({
      query: ({ id, ...category }) => ({
        url: `/categories/updateCategory/${id}`,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: ['Category'],
    }),

    // DELETE CATEGORY
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/deleteCategory/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),

    // CREATE PRODUCT
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/products/createProduct',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),

    // UPDATE PRODUCT
    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `/products/updateProduct/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),

    // DELETE PRODUCT
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/deleteProduct/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),

    // GET PENDING ORDERS (grouped by customer)
    getPendingOrders: builder.query({
      query: () => '/orders/pending',
      providesTags: ['Orders'],
    }),

    // APPROVE ORDER
    approveOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/approve`,
        method: 'PUT',
      }),
      invalidatesTags: ['Orders'],
    }),

    // REJECT ORDER
    rejectOrder: builder.mutation({
      query: ({ id, comment }) => ({
        url: `/orders/${id}/reject`,
        method: 'PUT',
        body: { comment },
      }),
      invalidatesTags: ['Orders'],
    }),

    // BULK APPROVE ORDERS
    bulkApproveOrders: builder.mutation({
      query: (orderIds) => ({
        url: '/orders/bulk-approve',
        method: 'POST',
        body: { order_ids: orderIds },
      }),
      invalidatesTags: ['Orders'],
    }),

    // GET ABOUT US CONTENT (singleton)
    getAboutUs: builder.query({
      query: () => '/content/about-us',
      providesTags: ['Content'],
    }),

    // CREATE ABOUT US CONTENT (first-time setup)
    createAboutUs: builder.mutation({
      query: (content) => ({
        url: '/content/about-us',
        method: 'POST',
        body: content,
      }),
      invalidatesTags: ['Content'],
    }),

    // UPDATE ABOUT US CONTENT
    updateAboutUs: builder.mutation({
      query: (content) => ({
        url: '/content/about-us',
        method: 'PUT',
        body: content,
      }),
      invalidatesTags: ['Content'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
  useGetCategoryTypesQuery,
  useCreateCategoryTypeMutation,
  useUpdateCategoryTypeMutation,
  useDeleteCategoryTypeMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetPendingOrdersQuery,
  useApproveOrderMutation,
  useRejectOrderMutation,
  useBulkApproveOrdersMutation,
  useGetAboutUsQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,
} = fitstoreApi;