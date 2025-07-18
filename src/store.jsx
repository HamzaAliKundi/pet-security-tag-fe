import { configureStore } from "@reduxjs/toolkit";
import { venuesApi } from "./apis/venues";
import { ordersApi } from "./apis/orders";
import { contactApi } from "./apis/contact";

export const store = configureStore({
  reducer: {
    [venuesApi.reducerPath]: venuesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(venuesApi.middleware)
      .concat(ordersApi.middleware)
      .concat(contactApi.middleware)
});
