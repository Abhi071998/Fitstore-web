import { fitstoreApi } from './baseApi';

export const ordersApi = fitstoreApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetPendingOrdersQuery,
  useApproveOrderMutation,
  useRejectOrderMutation,
  useBulkApproveOrdersMutation,
} = ordersApi;
