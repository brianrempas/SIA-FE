import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../src/services/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import reducer from "../src/reducers";

export const store = configureStore({
  reducer: {
    ...reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);