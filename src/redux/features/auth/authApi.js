import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/login/",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["profile"],
    }),
    profile: builder.query({
      query: () => ({
        // url: `/profile/${id}`,
        url: `/profile/`,
        method: "GET",
        // body: userInfo,
      }),
      providesTags: ["profile"],
    }),
    bookingList: builder.query({
      query: () => ({
        // url: `/profile/${id}`,
        url: `/fitnesscls/bookinglist/`,
        method: "GET",
        // body: userInfo,
      }),
      providesTags: ["bookings"],
    }),
    mmeberList: builder.query({
      query: () => ({
        // url: `/profile/${id}`,
        url: `/members/`,
        method: "GET",
        // body: userInfo,
      }),
      providesTags: ["members"],
    }),
    deleteMember: builder.mutation({
      query: (id) => ({
        // url: `/profile/${id}`,
        url: `/members/${id}`,
        method: "DELETE",
        // body: userInfo,
      }),
      providesTags: ["members"],
    }),
    logout: builder.query({
      query: () => ({
        // url: `/profile/${id}`,
        url: `/logout/`,
        method: "GET",
        // body: userInfo,
      }),
      invalidatesTags: ["profile"],
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/register/",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["profile"],
    }),
    editProfile: builder.mutation({
      query: ({ userInfo, id }) => ({
        url: `/profile/${id}/`,
        method: "PATCH",
        body: userInfo,
      }),
      invalidatesTags: ["profile", "members"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useProfileQuery,
  useBookingListQuery,
  useEditProfileMutation,
  useLogoutQuery,
  useLazyLogoutQuery,
  useMmeberListQuery,
  useDeleteMemberMutation,
} = authApi;
