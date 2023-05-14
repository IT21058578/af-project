import { InferSchemaType } from "mongoose";
import { commentSchema } from "../models/comment-model.js";
import { postSchema } from "../models/post/post-model.js";
import { tokenFamilySchema } from "../models/token-family-model.js";
import { userSchema } from "../models/user-model.js";
import { tripPackageSchema } from "../models/package-model.js";
import { locationSchema } from "../models/location-model.js";

export type TComment = InferSchemaType<typeof commentSchema> & {
	id?: string;
};
export type TPost = InferSchemaType<typeof postSchema> & {
	id?: string;
};
export type TTokenFamily = InferSchemaType<typeof tokenFamilySchema> & {
	id?: string;
};
export type TUser = InferSchemaType<typeof userSchema> & { id?: string };
export type TTripPackage = InferSchemaType<typeof tripPackageSchema> & {
	id?: string;
};
export type TLocation = InferSchemaType<typeof locationSchema> & {
	id?: string;
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
