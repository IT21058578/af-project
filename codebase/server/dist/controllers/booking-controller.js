import initializeLogger from "../utils/logger.js";
import { handleControllerError } from "../utils/misc-utils.js";
import { PaymentService } from "../services/payment-services.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const createCheckoutSession = async (req, res, next) => {
    try {
        log.info(`Intercepted createCheckoutSession request`);
        const { tripPackageId, pricingOptions, } = req.body;
        const userId = req.headers["user-id"];
        const sessionUrl = await PaymentService.createCheckoutSession(tripPackageId, pricingOptions, userId);
        return res.redirect(sessionUrl);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
export const BookingController = {
    createCheckoutSession,
};
