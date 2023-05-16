import { TRoleValue } from "./constant-types.js";
import {
	TComment,
	TLocation,
	TPost,
	TTripPackage,
	TUser,
} from "./model-types.js";

export type TUserVO = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
};

export type TDetailedUserVO = TUserVO & {
	roles: TRoleValue[];
	mobile: string;
	email: string;
	dateOfBirth: Date;
	isSubscribed: boolean;
	lastLoggedAt?: Date;
	updatedAt: Date;
	createdAt: Date;
};

export type TTripPackageVO = Omit<
	TTripPackage,
	"createdById" | "lastUpdatedById" | "plan" | "_id"
> & {
	id: string;
	createdBy: TUserVO;
	lastUpdatedBy: TUserVO;
	plan: (TLocationVO & { activities: string[] })[];
};

export type TPostVO = Omit<
	TPost,
	"createdById" | "lastUpdatedById" | "likes" | "dislikes" | "_id"
> & {
	id: string;
	createdBy: TUserVO;
	lastUpdatedBy: TUserVO;
	likeCount: number;
	dislikeCount: number;
	isLiked: boolean;
	isDisliked: boolean;
};

export type TCommentVO = Omit<
	TComment,
	"createdById" | "lastUpdatedById" | "likes" | "dislikes" | "_id"
> & {
	id: string;
	createdBy: TUserVO;
	lastUpdatedBy: TUserVO;
	likeCount: number;
	dislikeCount: number;
	isLiked: boolean;
	isDisliked: boolean;
};

export type TLocationVO = Omit<
	TLocation,
	"createdById" | "lastUpdatedById" | "_id"
> & {
	id: string;
	createdBy: TUserVO;
	lastUpdatedBy: TUserVO;
};
