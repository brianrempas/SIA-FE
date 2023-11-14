import { LoginRequest, LoginResponse } from "../types";
import { apiSlice } from "./apiSlice";

export const AuthService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => {
        return {
          url: "user/login",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = AuthService;
