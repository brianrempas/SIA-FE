import { ApiResponse, ProdiRequest, ProdiResponse } from "../types";
import { apiSlice } from "./apiSlice";
export const ProdiService = apiSlice
  .injectEndpoints({
    endpoints: (builder) => ({
      getProdi: builder.query<ApiResponse<ProdiResponse>, void>({
        query: () => {
          return {
            url: "prodi/",
            method: "get",
          };
        },
      }),
      createProdi: builder.mutation<ProdiResponse, ProdiRequest>({
        query: (body) => {
          return {
            url: "prodi/",
            method: "post",
            body,
          };
        },
      }),
      updateProdi: builder.mutation<ProdiResponse, ProdiRequest>({
        query: (body) => {
          return {
            url: "prodi/",
            method: "put",
            body,
          };
        },
      }),
      deleteProdi: builder.mutation<void, number>({
        query: (id) => {
          return {
            url: `prodi/${id}`, // Adjust the URL based on your API
            method: "delete",
          };
        },
      }),
    }),
  });

export const { useGetProdiQuery, useCreateProdiMutation, useUpdateProdiMutation, useDeleteProdiMutation } = ProdiService;
