import { EBookingError } from "../constants/constants.js";
import { Booking } from "../models/booking-model.js";
import { buildPage, buildPaginationPipeline } from "../utils/mongoose-utils.js";
// TODO: Create VO
const searchBookings = async (bookingSearchOptions) => {
    const { data, ...rest } = (await Booking.aggregate(buildPaginationPipeline(bookingSearchOptions)))[0];
    return buildPage({ ...rest, data }, bookingSearchOptions);
};
const getBooking = async (bookingId) => {
    const existingBooking = await Booking.findById(bookingId).exec();
    if (existingBooking == null)
        throw Error(EBookingError.NOT_FOUND);
    return existingBooking;
};
export const BookingService = {
    searchBookings,
    getBooking,
};
