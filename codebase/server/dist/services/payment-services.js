import Stripe from "stripe";
import fs from "fs/promises";
import initializeLogger from "../utils/logger.js";
import { EmailService } from "./email-service.js";
import { TripPackage } from "../models/package/package-model.js";
import { CHECKOUT_CANCEL_URL, CHECKOUT_SUCCESS_URL, ETripPackageError, } from "../constants/constants.js";
import { TripPackageService } from "./package-service.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const webhookSecret = "whsec_9631f4bbf3991a9e000a356cc094ba6b28f859db7d0e4424d056b15c47e8bfec";
let stripeSecretKey;
let stripe;
const loadKeys = async () => {
    try {
        log.info("Loading keys...");
        stripeSecretKey = await fs.readFile("./src/assets/keys/stripe-test-secret-key.txt", {
            encoding: "utf-8",
        });
        stripe = new Stripe(stripeSecretKey, {
            apiVersion: "2022-11-15",
            typescript: true,
        });
        log.info("Successfully loaded all keys");
    }
    catch (error) {
        log.error("Failed to load keys");
        throw error;
    }
};
loadKeys();
const createCheckoutSession = async (id, pricingOptions, userId) => {
    const existingTripPackage = await TripPackage.findById(id).exec();
    if (existingTripPackage === null)
        throw Error(ETripPackageError.TRIP_PKG_NOT_FOUND);
    const calculatedPrice = TripPackageService.calculatePrice(existingTripPackage, pricingOptions);
    const { url } = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "lkr",
                    product: existingTripPackage.id,
                    product_data: {
                        name: existingTripPackage.name ?? "",
                        description: existingTripPackage.description ?? "",
                        metadata: {
                            userId: userId,
                            persons: pricingOptions.persons,
                            logding: pricingOptions.lodging,
                            transport: pricingOptions.transport,
                            withFood: pricingOptions.withFood ? "true" : "false",
                        },
                    },
                },
                price: String(calculatedPrice),
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: CHECKOUT_SUCCESS_URL,
        cancel_url: CHECKOUT_CANCEL_URL,
    });
    if (url === null)
        throw Error("");
    return url;
};
const handleWebhookEvent = async (payload, signature) => {
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    switch (event.type) {
        case "checkout.session.completed":
            console.log("bruh");
            await handleCheckoutSessionCompleted(event.data.object);
            break;
    }
};
const handleCheckoutSessionCompleted = async (data) => {
    /** Get user data here and pass to functions */
    log.info("Handling checkout.session.completed event");
    const temp = await stripe.checkout.sessions.retrieve(data.id);
    await Promise.all([
        EmailService.sendOrderConfirmationEmail("", ""),
        createOrder(data, ""),
    ]);
};
const createOrder = async (data, userId) => {
    const { line_items } = await stripe.checkout.sessions.retrieve(data.id, {
        expand: ["line-items"],
    });
};
export const PaymentService = {
    createCheckoutSession,
    handleWebhookEvent,
};
