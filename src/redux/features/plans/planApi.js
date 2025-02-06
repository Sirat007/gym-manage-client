import { baseApi } from "../../api/baseApi";

const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlanList: builder.query({
      query: () => ({
        url: "/planlist",
        method: "GET",
      }),
    }),
    getClassByID: builder.query({
      query: (id) => ({
        url: `/fitnesscls/list/${id}`,
        method: "GET",
      }),
    }),
    addClass: builder.mutation({
      query: (userInfo) => ({
        url: "/register/",
        method: "POST",
        body: userInfo,
      }),
    }),
    addPlan: builder.mutation({
      query: (planInfo) => ({
        url: "/plancreate/",
        method: "POST",
        body: planInfo,
      }),
    }),
    addPlanBooking: builder.mutation({
      query: (planInfo) => ({
        url: "/planadd/",
        method: "POST",
        body: planInfo,
      }),
    }),
    updatePlan: builder.mutation({
      query: ({ planInfo, id }) => ({
        url: `/planedit/${id}`,
        method: "PATCH",
        body: planInfo,
      }),
    }),
    deletePlan: builder.mutation({
      query: (id) => ({
        url: `/planedit/${id}`,
        method: "DELETE",
        // body: userInfo,
      }),
    }),
  }),
});

export const {
  useGetPlanListQuery,
  useAddClassMutation,
  useGetClassByIDQuery,
  useAddPlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  useAddPlanBookingMutation,
} = classApi;
