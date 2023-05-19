import { BOOKING_URL } from "../../constants/constants";
import { baseApi } from "./base-api-slice";

export const bookingsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getBooking: builder.query({
			query: ({ bookingId }) => ({
				url: `${BOOKING_URL}/${bookingId}`,
			}),
		}),
		searchBookings: builder.query({
			query: ({ ...searchOptions }) => ({
				url: `${BOOKING_URL}/search?${new URLSearchParams(
					searchOptions
				).toString()}`,
			}),
		}),
		createCheckoutSession: builder.mutation({
			query: ({ tripPackageId, pricingOptions }) => ({
				url: `${BOOKING_URL}/session`,
				body: {
					tripPackageId,
					pricingOptions,
				},
				method: "POST",
			}),
		}),
	}),
});

export const {
	useLazyGetBookingQuery,
	useLazySearchBookingsQuery,
	useCreateCheckoutSessionMutation,
} = bookingsApi;
