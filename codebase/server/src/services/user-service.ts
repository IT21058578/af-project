import { IAuthorizedUser, TExtendedPageOptions } from "../types/misc-types.js";
import { TPost, TUser } from "../types/model-types.js";
import { TUserVO } from "../types/vo-types.js";
import initializeLogger from "../utils/logger.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const getUser = async (id: string) => {};

const searchUsers = async (searchConfig: TExtendedPageOptions<TUser>) => {};

const deleteUser = async (id: string, authorizedUser: IAuthorizedUser) => {};

const editUser = async (
	id: string,
	editedUser: Partial<TUser>,
	authorizedUser: IAuthorizedUser
) => {};

const buildUserVO = (user: TUser): TUserVO => {
	return {
		id: user.id ?? "",
		email: user.email ?? "",
		firstName: user.firstName ?? "",
		lastName: user.lastName ?? "",
	};
};

export const UserService = {
	buildUserVO,
	getUser,
	searchUsers,
	deleteUser,
	editUser,
};
