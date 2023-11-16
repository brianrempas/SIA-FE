import { SubjectResponse, SubjectRequest } from "../types";
import { apiSlice } from "./apiSlice";
export const SubjectService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubject: builder.query<SubjectResponse[], void>({
      query: () => {
        return {
          url: "subject/",
          method: "get",
        };
      },
    }),
    createLecture: builder.mutation<SubjectResponse, SubjectRequest>({
      query: (body) => {
        return {
          url: "lecture/",
          method: "post",
          body,
        };
      },
    }),
    updateLecture: builder.mutation<SubjectResponse, SubjectRequest>({
      query: (body) => {
        return {
          url: "lecture/",
          method: "post",
          body,
        };
      },
    }),
    deleteLecture: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `student/${id}`,
          method: "delete",
        };
      },
    }),
  }),
});

export const { useGetSubjectQuery } = SubjectService;
