import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petProfileApi = createApi({
  reducerPath: "petProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    // Get pet profile for public view (when QR is scanned)
    getPetProfile: builder.query({
      query: (petId) => ({
        url: `/qr/pet-profile/${petId}`,
        method: "GET",
      }),
    }),

    // Scan QR code
    scanQRCode: builder.query({
      query: (code) => ({
        url: `/qr/scan/${code}`,
        method: "GET",
      }),
    }),

    // Get QR verification details
    getQRVerificationDetails: builder.query({
      query: (code) => ({
        url: `/qr/verify-details/${code}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPetProfileQuery,
  useScanQRCodeQuery,
  useGetQRVerificationDetailsQuery,
} = petProfileApi;
