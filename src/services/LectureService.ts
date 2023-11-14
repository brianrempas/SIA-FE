import { ApiResponse, LectureResponse } from "../types";
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
  }),
});

export const { useGetLectureQuery } = StudentService;
