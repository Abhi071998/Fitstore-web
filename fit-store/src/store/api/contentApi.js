import { fitstoreApi } from './baseApi';

export const contentApi = fitstoreApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useGetAboutUsQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,
} = contentApi;
