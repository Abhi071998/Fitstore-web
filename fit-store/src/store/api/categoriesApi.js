import { fitstoreApi } from './baseApi';

export const categoriesApi = fitstoreApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL CATEGORIES
    getCategories: builder.query({
      query: () => '/categories/getAllCategories',
      providesTags: ['Category'],
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
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
