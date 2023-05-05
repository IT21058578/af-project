import { LOCATION_URL } from "../../constants/constants";
import { baseApi } from "./base-api-slice";

export const locationsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getLocations: builder.query({
			query: ({ locationId }) => ({
				url: `${LOCATION_URL}/${locationId}`,
			}),
		}),
		searchLocations: builder.query({
			query: ({ ...searchOptions }) => ({
				url: `${LOCATION_URL}/search?${new URLSearchParams(
					searchOptions
				).toString()}`,
			}),
		}),
		createLocations: builder.mutation({
			query: (body) => ({
				url: `${LOCATION_URL}/`,
				method: "POST",
				body,
			}),
		}),
		editLocations: builder.mutation({
			query: ({ locationId, ...body }) => ({
				url: `${LOCATION_URL}/${locationId}`,
				method: "PUT",
				body,
			}),
		}),
		deleteLocations: builder.mutation({
			query: ({ locationId }) => ({
				url: `${LOCATION_URL}/${locationId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useLazyGetLocationsQuery,
	useLazySearchLocationssQuery,
	useCreateLocationsMutation,
	useEditLocationsMutation,
	useDeleteLocationsMutation,
} = locationsApi;
