import { baseApi } from "../../api/baseApi";

const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassList: builder.query({
      query: () => ({
        url: "/fitnesscls/list",
        method: "GET",
      }),
      providesTags: ["class"],
    }),

    getClassByID: builder.query({
      query: (id) => ({
        url: `/fitnesscls/list/${id}`,
        method: "GET",
      }),
    }),
    addBooking: builder.mutation({
      query: (bookingInfo) => ({
        url: "/fitnesscls/booking/",
        method: "POST",
        body: bookingInfo,
      }),
      invalidatesTags: ["profile", "bookings"],
    }),
    addClass: builder.mutation({
      query: (classInfo) => ({
        url: "/fitnesscls/create/",
        method: "POST",
        body: classInfo,
      }),
      invalidatesTags: ["class"],
    }),
    editClass: builder.mutation({
      query: ({ classInfo, id }) => ({
        url: `/fitnesscls/delete/${id}`,
        method: "PATCH",
        body: classInfo,
      }),
      invalidatesTags: ["class"],
    }),
    deleteClass: builder.mutation({
      query: (id) => ({
        url: `/fitnesscls/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["class"],
    }),

    getAllBookingList: builder.query({
      query: () => ({
        url: "/fitnesscls/booking/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetClassListQuery,
  useGetClassByIDQuery,
  useAddBookingMutation,
  useGetAllBookingListQuery,
  useAddClassMutation,
  useEditClassMutation,
  useDeleteClassMutation,
} = classApi;
