import { apiSlice } from './apiSlice';

const LEAVE_URL = 'http://localhost:5000/api/leave';


const getToken = () => {
  return localStorage.getItem('token');
};

export const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLeaveRequest: builder.mutation({
      query: (data) => ({
        url: `${LEAVE_URL}/apply`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
        },
        body: data,
      }),
    }),
    getAllLeaveRequests: builder.query({
      query: () => ({
        url: `${LEAVE_URL}/get-all-leaves`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
        }
      }),
    }),
    getLeaveRequestById: builder.query({
      query: (id) => ({
        url: `${LEAVE_URL}/get-leave/${id}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
        }
      }),
    }),
    updateLeaveRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `${LEAVE_URL}/update-leave/${id}`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
        },
        body: data,
      }),
    }),
    deleteLeaveRequest: builder.mutation({
      query: (id) => ({
        url: `${LEAVE_URL}/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
        }
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
