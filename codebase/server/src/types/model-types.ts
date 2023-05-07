import { InferSchemaType } from "mongoose";
import { commentSchema } from "../models/comment-model.js";
import { postSchema } from "../models/post-model.js";
import { tokenFamilySchema } from "../models/token-family-model.js";
import { userSchema } from "../models/user-model.js";
import { tripPackageSchema } from "../models/package-model.js";
import { locationSchema } from "../models/location-model.js";

export type TComment = InferSchemaType<typeof commentSchema>;
export type TPost = InferSchemaType<typeof postSchema>;
export type TTokenFamily = InferSchemaType<typeof tokenFamilySchema>;
export type TUser = InferSchemaType<typeof userSchema>;
export type TTripPackage = InferSchemaType<typeof tripPackageSchema>;
export type TLocation = InferSchemaType<typeof locationSchema>;
