import { UserResponse } from "../types";
import { apiSlice } from "./apiSlice";
export const UserService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse[], void>({
      query: () => {
        return {
          url: "user/",
          method: "get",
        };
      },
    }),
  }),
});

export const { useGetUserQuery } = UserService;
