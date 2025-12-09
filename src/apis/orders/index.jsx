import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/user/orders",
        method: "POST",
        body: orderData,
      }),
    }),

    getOrder: builder.query({
      query: (orderId) => `/user/orders/${orderId}`,
    }),

    updateOrderShipping: builder.mutation({
      query: ({ orderId, shippingData }) => ({
        url: `/user/orders/${orderId}/shipping`,
        method: "PATCH",
        body: shippingData,
      }),
    }),

    updateOrderStatus: builder.mutation({
      query: ({ orderId, statusData }) => ({
        url: `/user/orders/${orderId}/status`,
        method: "PATCH",
        body: statusData,
      }),
    }),

    confirmPayment: builder.mutation({
      query: ({ orderId, paymentIntentId, referralCode }) => ({
        url: `/user/orders/${orderId}/confirm-payment${referralCode ? `?referralCode=${encodeURIComponent(referralCode)}` : ''}`,
        method: "POST",
        body: { paymentIntentId },
      }),
    }),

    checkQRAvailability: builder.query({
      query: () => ({
        url: "/qr/check-availability",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useUpdateOrderShippingMutation,
  useUpdateOrderStatusMutation,
  useConfirmPaymentMutation,
  useCheckQRAvailabilityQuery,
} = ordersApi; 