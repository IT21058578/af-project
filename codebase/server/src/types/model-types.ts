import { InferSchemaType } from "mongoose";
import { commentSchema } from "../models/comment-model.js";
import { postSchema } from "../models/post/post-model.js";
import { tokenFamilySchema } from "../models/token-family-model.js";
import { userSchema } from "../models/user-model.js";
import { tripPackageSchema } from "../models/package/package-model.js";
import { locationSchema } from "../models/location-model.js";
import { bookingSchema } from "../models/booking-model.js";

export type TComment = InferSchemaType<typeof commentSchema> & {
	_id?: any;
};
export type TPost = InferSchemaType<typeof postSchema> & {
	_id?: any;
};
export type TTokenFamily = InferSchemaType<typeof tokenFamilySchema> & {
	_id?: any;
};
export type TUser = InferSchemaType<typeof userSchema> & { _id?: any };
export type TTripPackage = InferSchemaType<typeof tripPackageSchema> & {
	_id?: any;
};
export type TLocation = InferSchemaType<typeof locationSchema> & {
	_id?: any;
};
export type TBooking = InferSchemaType<typeof bookingSchema> & {
	_id?: any;
};

export type TLodging = keyof Required<
	Required<TTripPackage>["price"]
>["lodging"];

export type TTransport = keyof Required<
	Required<TTripPackage>["price"]
>["transport"];

export type TPricingOptions = {
	persons: number;
	lodging: TLodging;
	transport: TTransport;
	withFood?: boolean;
};
