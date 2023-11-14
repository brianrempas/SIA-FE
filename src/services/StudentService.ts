import { ApiResponse, StudentRequest, StudentResponse } from "../types";
import { apiSlice } from "./apiSlice";
export const StudentService = apiSlice
  .enhanceEndpoints({ addTagTypes: ["getStudent"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getStudent: builder.query<ApiResponse<StudentResponse>, void>({
        query: () => {
          return {
            url: "student/",
            method: "get",
          };
        },
        providesTags: ['getStudent'],
      }),
      createStudent: builder.mutation<StudentResponse, StudentRequest>({
        query: (body) => {
          return {
            url: "student/",
            method: "post",
            body,
          };
        },
        invalidatesTags: (result) => (result ? ['getStudent'] : []),
      }),
    }),
  });

export const { useGetStudentQuery, useCreateStudentMutation } = StudentService;
