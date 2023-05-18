import { EBookingError } from "../constants/constants.js";
import { Booking } from "../models/booking-model.js";
import {
	IPaginationResult,
	TExtendedPageOptions,
} from "../types/misc-types.js";
import { TBooking } from "../types/model-types.js";
import { PageUtils, buildPaginationPipeline } from "../utils/mongoose-utils.js";

// TODO: Create VO

const searchBookings = async (
	bookingSearchOptions: TExtendedPageOptions<TBooking>
) => {
	const { data, ...rest } = (
		await Booking.aggregate(buildPaginationPipeline(bookingSearchOptions))
	)[0] as any as IPaginationResult<TBooking>;
	return PageUtils.buildPage({ ...rest, data }, bookingSearchOptions);
};

const getBooking = async (bookingId: string) => {
	const existingBooking = await Booking.findById(bookingId);
	if (existingBooking == null) throw Error(EBookingError.NOT_FOUND);
	return existingBooking;
};

export const BookingService = {
	searchBookings,
	getBooking,
};
