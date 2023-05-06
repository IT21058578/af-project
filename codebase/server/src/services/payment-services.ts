import Stripe from "stripe";
import { stripe } from "../index.js";
import initializeLogger from "../utils/logger.js";
import { EmailService } from "./email-service.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const endpointSecret = "";

const createCheckoutSession = async () => {
	// TODO: We need to get and calculate the amounts server-side then verify
	// the client-side received amount is the same. If it isn't make an error.
	const { url } = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: "",
					product: "product_id",
					product_data: {
						name: "product_name",
						description: "product_description",
						metadata: {
							persons: 0,
							transport: "",
							lodging: "",
							withFood: 0,
						},
					},
				},
			},
		],
		// TODO: Put proper urls here
		mode: "payment",
		success_url: "success url here",
		cancel_url: "cancel url here",
	});

	if (url === null) throw Error("");
	return url;
};

const handleWebhookEvent = async (payload: any, signature: string) => {
	const event = stripe.webhooks.constructEvent(
		payload,
		signature,
		endpointSecret
	);

	switch (event.type) {
		case "checkout.session.completed":
			await handleCheckoutSessionCompleted(
				event.data.object as Stripe.Checkout.Session
			);
			break;
		default:
			log.warn("Received an unhandled event from Stripe");
	}
};

const handleCheckoutSessionCompleted = async (
	data: Stripe.Checkout.Session
) => {
	/** Get user data here and pass to functions */
	const temp = await stripe.checkout.sessions.retrieve(data.id);
	await Promise.all([
		EmailService.sendOrderConfirmationEmail("", ""),
		createOrder(data, ""),
	]);
};

const createOrder = async (data: Stripe.Checkout.Session, userId: string) => {
	const { line_items } = await stripe.checkout.sessions.retrieve(data.id, {
		expand: ["line-items"],
	});
	// TODO: Store data in database
};

export const PaymentService = {
	createCheckoutSession,
	handleWebhookEvent,
};
