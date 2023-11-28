import { ApiResponse, LectureResponse, LectureRequest } from "../types";
import { apiSlice } from "./apiSlice";
export const StudentService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLecture: builder.query<ApiResponse<LectureResponse>, void>({
      query: () => {
        return {
          url: "lecture/",
          method: "get",
        };
      },
    }),
    createLecture: builder.mutation<LectureResponse, LectureRequest>({
      query: (body) => {
        return {
          url: "lecture/",
          method: "post",
          body,
        };
      },
    }),
    updateLecture: builder.mutation<LectureResponse, LectureRequest>({
      query: (body) => {
        return {
          url: "lecture/",
          method: "put",
          body,
        };
      },
    }),
    deleteLecture: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `lecture/${id}`,
          method: "delete",
        };
      },
    }),
  }),
});

export const { useGetLectureQuery, useCreateLectureMutation, useUpdateLectureMutation, useDeleteLectureMutation } = StudentService;
