import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const investApi = createApi({
  reducerPath: "investApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    submitInvestment: builder.mutation({
      query: (investmentData) => ({
        url: "/user/invest",
        method: "POST",
        body: investmentData,
      }),
    }),
  }),
});

export const {
  useSubmitInvestmentMutation,
} = investApi;

