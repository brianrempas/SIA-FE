import { ApiResponse, UserResponse, UserRequest } from "../types";
import { apiSlice } from "./apiSlice";
export const UserService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<ApiResponse<UserResponse>, void>({
      query: () => {
        return {
          url: "user/",
          method: "get",
        };
      },
    }),
    createUser: builder.mutation<UserResponse, UserRequest>({
      query: (body) => {
        return {
          url: "user/register",
          method: "post",
          body,
        };
      },
    }),
    updateUser: builder.mutation<UserResponse, UserRequest>({
      query: (body) => {
        return {
          url: "user/",
          method: "put",
          body,
        };
      },
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `user/${id}`,
          method: "delete",
        };
      },
    }),
  }),
});

export const { useGetUserQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = UserService;
