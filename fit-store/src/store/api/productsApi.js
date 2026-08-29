import { fitstoreApi } from './baseApi';

export const productsApi = fitstoreApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET PRODUCTS QUERY: Use "query" for GET requests (fetching data)
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),

    // GET ALL PRODUCTS FOR A CATEGORY
    getProductsByCategory: builder.query({
      query: (categoryId) => `/products/getAllProducts/${categoryId}`,
      providesTags: ['Products'],
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
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
