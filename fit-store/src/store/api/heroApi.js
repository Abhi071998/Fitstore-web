import { fitstoreApi } from './baseApi';

export const heroApi = fitstoreApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET HERO CONTENT (singleton)
    getHero: builder.query({
      query: () => '/content/hero',
      providesTags: ['Hero'],
    }),

    // CREATE HERO CONTENT (first-time setup)
    createHero: builder.mutation({
      query: (content) => ({
        url: '/content/hero',
        method: 'POST',
        body: content,
      }),
      invalidatesTags: ['Hero'],
    }),

    // UPDATE HERO CONTENT (overwrites every field — no partial updates)
    updateHero: builder.mutation({
      query: (content) => ({
        url: '/content/hero',
        method: 'PUT',
        body: content,
      }),
      invalidatesTags: ['Hero'],
    }),
  }),
});

export const {
  useGetHeroQuery,
  useCreateHeroMutation,
  useUpdateHeroMutation,
} = heroApi;
