import { TRoleValue } from "./constant-types.js";
import { TComment, TPost } from "./model-types.js";

export interface IAuthorizedUser {
	roles: TRoleValue[];
	id: string;
}

export type TExtendedPageOptions<T> = {
	pageNum?: number;
	pageSize?: number;
	sortField?: string;
	sortDir?: "asc" | "desc";
} & {
	[Property in keyof T]: string;
};

export interface IPostPageOptions extends TExtendedPageOptions<TPost> {
	authorName?: string;
}

export interface ICommentPageOptions extends TExtendedPageOptions<TComment> {}

export interface IPaginationResult<T> {
	data: T[];
	countInPage: number;
	countInQuery: number;
}

export interface IServerError {
	type?: string;
	cause?: string;
	location?: string;
	errors?: any;
}
