import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../reducers/authSlice";
import { RootState } from "../store";
import { selectAuth } from "../reducers/authSlice";
import { useAppSelector } from "../reducers/hooks";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  prepareHeaders: (headers, { getState }) => {
    //const token = (getState() as RootState).authReducer.token;
    let token = useAppSelector(selectAuth)
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (_builder) => ({}),
});
