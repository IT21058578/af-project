import { TRoleValue } from "./constant-types";

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

export interface IPaginationResult<T> {
	data: T[];
	countInPage: number;
	countInQuery: number;
}
