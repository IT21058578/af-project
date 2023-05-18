import { PACKAGE_URL } from "../../constants/constants";
import { baseApi } from "./base-api-slice";

export const tripPackagesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTripPackges: builder.query({
			query: () => ({
				url: `${PACKAGE_URL}`,
			}),
		}),
		getTripPackge: builder.query({
			query: ({ tripPackageId }) => ({
				url: `${PACKAGE_URL}/${tripPackageId}`,
			}),
		}),
		searchTripPackges: builder.query({
			query: ({ ...searchOptions }) => ({
				url: `${PACKAGE_URL}/search?${new URLSearchParams(
					searchOptions
				).toString()}`,
			}),
		}),
		createTripPackge: builder.mutation({
			query: (body) => ({
				url: `${PACKAGE_URL}/`,
				method: "POST",
				body,
			}),
		}),
		editTripPackge: builder.mutation({
			query: ({ tripPackageId, ...body }) => ({
				url: `${PACKAGE_URL}/${tripPackageId}`,
				method: "PUT",
				body,
			}),
		}),
		deleteTripPackge: builder.mutation({
			query: ({ tripPackageId }) => ({
				url: `${PACKAGE_URL}/${tripPackageId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useLazyGetTripPackgeQuery,
	useLazyGetTripPackgesQuery,
	useLazySearchTripPackgesQuery,
	useCreateTripPackgeMutation,
	useEditTripPackgeMutation,
	useDeleteTripPackgeMutation,
} = tripPackagesApi;
