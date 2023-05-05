import { TRoleValue } from "./constant-types.js";
import { TPost } from "./model-types.js";

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
	/** Most comments and views per second */
	isHot?: true;
	/** Most views */
	isPopular?: true;
	/** Most comments per view */
	isControversial?: true;
	authorName?: string;
}

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
