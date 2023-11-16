import { ApiResponse, StudentRequest, StudentResponse } from "../types";
import { apiSlice } from "./apiSlice";
export const StudentService = apiSlice
  .enhanceEndpoints({ addTagTypes: ["getStudent","createStudent","updateStudent","deleteStudent"] })
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
        invalidatesTags: (result) => (result ? ['createStudent'] : []),
      }),
      updateStudent: builder.mutation<StudentResponse, StudentRequest>({
        query: (body) => {
          return {
            url: "student/",
            method: "post",
            body,
          };
        },
        invalidatesTags: (result) => (result ? ['updateStudent'] : []),
      }),
      deleteStudent: builder.mutation<void, number>({
        query: (id) => {
          return {
            url: `student/${id}`, // Adjust the URL based on your API
            method: "delete",
          };
        },
        invalidatesTags: ['deleteStudent'],
      }),
    }),
  });

export const { useGetStudentQuery, useCreateStudentMutation, useUpdateStudentMutation, useDeleteStudentMutation } = StudentService;
