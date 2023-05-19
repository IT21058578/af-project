import dotenv from "dotenv";
dotenv.config();
export const { SMTP_USER, SMTP_PASS, MONGODB_URI, PORT, NODE_ENV, TEST_DB_NAME, DB_NAME, WEB_CLIENT_DOMAIN, } = process.env;
export const CHECKOUT_SUCCESS_URL = `${WEB_CLIENT_DOMAIN}/checkout/success`;
export const CHECKOUT_CANCEL_URL = `${WEB_CLIENT_DOMAIN}/checkout/cancel`;
export const COMMENT_WEIGHT = 5;
export const VIEW_WEIGHT = 1;
export const Role = {
    USER: "USER",
    ADMIN: "ADMIN",
};
export const ELodging = {
    THREE_STAR: "threeStar",
    FOUR_STAR: "fourStar",
    FIVE_STAR: "fiveStar",
};
export const ETransport = {
    GROUP: "group",
    CAR: "car",
    VAN: "van",
};
export const ELocationError = {
    LOCATION_NOT_FOUND: "Location not found",
    LOCATION_ALREADY_EXISTS: "Location already exists",
};
export const EUserError = {
    NOT_FOUND: "User not found",
    UNAUTHORIZED: "User is not authorized",
};
export const ETripPackageError = {
    TRIP_PKG_NOT_FOUND: "Trip Package not found",
    TRIP_PKG_ALREADY_EXISTS: "Trip Package already exists",
    PRICE_UNDEFINED: "Trip Package has no prices defined for any option",
};
export const EPaymentErrors = {
    SESSION_URL_UNAVAILABLE: "Session URL unavailable",
    UNAUTHORIZED_WEBHOOK: "Unauthorized Webhook endpoints access",
};
export const EBookingError = {
    NOT_FOUND: "Booking not found",
};
