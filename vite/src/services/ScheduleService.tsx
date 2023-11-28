import { ApiResponse, ScheduleResponse, ScheduleRequest } from "../types";
import { apiSlice } from "./apiSlice";
export const StudentService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSchedule: builder.query<ApiResponse<ScheduleResponse>, void>({
      query: () => {
        return {
          url: "schedule/",
          method: "get",
        };
      },
    }),
    createSchedule: builder.mutation<ScheduleResponse, ScheduleRequest>({
      query: (body) => {
        return {
          url: "schedule/",
          method: "post",
          body,
        };
      },
    }),
    updateSchedule: builder.mutation<ScheduleResponse, ScheduleRequest>({
      query: (body) => {
        return {
          url: "schedule/",
          method: "put",
          body,
        };
      },
    }),
    deleteSchedule: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `schedule/${id}`,
          method: "delete",
        };
      },
    }),
  }),
});

export const { useGetScheduleQuery, useCreateScheduleMutation, useUpdateScheduleMutation, useDeleteScheduleMutation } = StudentService;
