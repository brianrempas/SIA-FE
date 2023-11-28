import { ApiResponse, ScoreRequest, ScoreResponse } from "../types";
import { apiSlice } from "./apiSlice";
export const ScoreService = apiSlice
  .enhanceEndpoints({ addTagTypes: ["getScore","createScore","updateScore","deleteScore"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getScore: builder.query<ApiResponse<ScoreResponse>, void>({
        query: () => {
          return {
            url: "score/",
            method: "get",
          };
        },
        providesTags: ['getScore'],
      }),
      createScore: builder.mutation<ScoreResponse, ScoreRequest>({
        query: (body) => {
          return {
            url: "score/",
            method: "post",
            body,
          };
        },
        invalidatesTags: (result) => (result ? ['createScore'] : []),
      }),
      updateScore: builder.mutation<ScoreResponse, ScoreRequest>({
        query: (body) => {
          return {
            url: "score/",
            method: "put",
            body,
          };
        },
        invalidatesTags: (result) => (result ? ['updateScore'] : []),
      }),
      deleteScore: builder.mutation<void, number>({
        query: (id) => {
          return {
            url: `score/${id}`, // Adjust the URL based on your API
            method: "delete",
          };
        },
        invalidatesTags: ['deleteScore'],
      }),
    }),
  });

export const { useGetScoreQuery, useCreateScoreMutation, useUpdateScoreMutation, useDeleteScoreMutation } = ScoreService;
