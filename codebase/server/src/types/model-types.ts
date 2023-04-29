import { InferSchemaType } from "mongoose";
import { commentSchema } from "../models/comment-model";
import { postSchema } from "../models/post-model";
import { tokenFamilySchema } from "../models/token-family-model";
import { userSchema } from "../models/user-model";

export type TComment = InferSchemaType<typeof commentSchema>;
export type TPost = InferSchemaType<typeof postSchema>;
export type TTokenFamily = InferSchemaType<typeof tokenFamilySchema>;
export type TUser = InferSchemaType<typeof userSchema>;
