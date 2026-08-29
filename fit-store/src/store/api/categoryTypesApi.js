import { fitstoreApi } from './baseApi';

export const categoryTypesApi = fitstoreApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetCategoryTypesQuery,
  useCreateCategoryTypeMutation,
  useUpdateCategoryTypeMutation,
  useDeleteCategoryTypeMutation,
} = categoryTypesApi;
