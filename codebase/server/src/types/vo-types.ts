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

export type TDetailedUserVO = {};

export type TTripPackageVO = Omit<
	TTripPackage,
	"createdById" | "lastUpdatedById" | "plan"
> & {
	createdBy: TUserVO;
	lastUpdatedBy: TUserVO;
	plan: (TLocationVO & { activities: string[] })[];
};

export type TPostVO = Omit<
	TPost,
	"createdById" | "lastUpdatedById" | "likes" | "dislikes"
> & {
	createdBy: TUserVO;
	lastUpdatedBy: TUserVO;
	likeCount: number;
	dislikeCount: number;
	isLiked: boolean;
	isDisliked: boolean;
};

export type TCommentVO = Omit<
	TComment,
	"createdById" | "lastUpdatedById" | "likes" | "dislikes"
> & {
	createdBy: TUserVO;
	lastUpdatedBy: TUserVO;
	likeCount: number;
	dislikeCount: number;
	isLiked: boolean;
	isDisliked: boolean;
};

export type TLocationVO = Omit<TLocation, "createdById" | "lastUpdatedById"> & {
	createdBy: TUserVO;
	lastUpdatedBy: TUserVO;
};
