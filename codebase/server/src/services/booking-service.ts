import { TExtendedPageOptions } from "../types/misc-types.js";
import { TBooking } from "../types/model-types.js";

const searchBookings = async (
	bookingSearchOptions: Partial<TExtendedPageOptions<TBooking>>
) => {};

const getBooking = async (bookingId: string) => {};

export const BookingService = {
	searchBookings,
	getBooking,
};
