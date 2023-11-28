import { ApiResponse, SubjectResponse, SubjectRequest } from "../types";
import { apiSlice } from "./apiSlice";
export const SubjectService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubject: builder.query<ApiResponse<SubjectResponse>, void>({
      query: () => {
        return {
          url: "subject/",
          method: "get",
        };
      },
    }),
    createSubject: builder.mutation<SubjectResponse, SubjectRequest>({
      query: (body) => {
        return {
          url: "subject/",
          method: "post",
          body,
        };
      },
    }),
    updateSubject: builder.mutation<SubjectResponse, SubjectRequest>({
      query: (body) => {
        return {
          url: "subject/",
          method: "put",
          body,
        };
      },
    }),
    deleteSubject: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `subject/${id}`,
          method: "delete",
        };
      },
    }),
  }),
});

export const { useGetSubjectQuery, useCreateSubjectMutation, useUpdateSubjectMutation, useDeleteSubjectMutation } = SubjectService;
