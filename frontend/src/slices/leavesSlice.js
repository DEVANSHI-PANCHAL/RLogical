import { apiSlice } from './apiSlice';

const LEAVE_URL = '/api/leave';

export const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLeaveRequest: builder.mutation({
      query: (data) => ({
        url: `${LEAVE_URL}/apply`,
        method: 'POST',
        body: data,
      }),
    }),
    getAllLeaveRequests: builder.query({
      query: () => ({
        url: `${LEAVE_URL}/get-all-leaves`,
        method: 'GET',
      }),
    }),
    getLeaveRequestById: builder.query({
      query: (id) => ({
        url: `${LEAVE_URL}/get-leave/${id}`,
        method: 'GET',
      }),
    }),
    updateLeaveRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `${LEAVE_URL}/update-leave/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteLeaveRequest: builder.mutation({
      query: (id) => ({
        url: `${LEAVE_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateLeaveRequestMutation,
  useGetAllLeaveRequestsQuery,
  useGetLeaveRequestByIdQuery,
  useUpdateLeaveRequestMutation,
  useDeleteLeaveRequestMutation,
} = leaveApiSlice;
