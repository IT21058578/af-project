import { EUserError, Role } from "../constants/constants.js";
import { User } from "../models/user-model.js";
import {
	IAuthorizedUser,
	IPaginationResult,
	TExtendedPageOptions,
} from "../types/misc-types.js";
import { TUser } from "../types/model-types.js";
import { TDetailedUserVO, TUserVO } from "../types/vo-types.js";
import initializeLogger from "../utils/logger.js";
import { buildPage, buildPaginationPipeline } from "../utils/mongoose-utils.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const getUser = async (id: string) => {
	const user = await User.findById(id).exec();
	if (user === null) throw Error(EUserError.NOT_FOUND);
	const userVO = buildDetailedUserVO(user.toObject());
	return userVO;
};

const searchUsers = async (userSearchOptions: TExtendedPageOptions<TUser>) => {
	const { data, ...rest } = (
		await User.aggregate(
			buildPaginationPipeline(userSearchOptions as any)
		).exec()
	)[0] as any as IPaginationResult<TUser>;
	const userVOs = await Promise.all(
		data.map(async (user) => {
			return buildUserVO(user);
		})
	);
	return buildPage({ data: userVOs, ...rest }, userSearchOptions);
};

const deleteUser = async (userId: string, authorizedUser: IAuthorizedUser) => {
	if (
		!authorizedUser.roles.includes(Role.ADMIN) &&
		authorizedUser.id !== userId
	) {
		throw Error(EUserError.UNAUTHORIZED);
	}

	await User.findByIdAndDelete(userId);
};

const editUser = async (
	userId: string,
	editedUser: Partial<TUser>,
	authorizedUser: IAuthorizedUser
) => {
	if (
		!authorizedUser.roles.includes(Role.ADMIN) &&
		authorizedUser.id !== userId
	) {
		throw Error(EUserError.UNAUTHORIZED);
	}

	const existingUser = await User.findById(userId).exec();
	if (existingUser == null) throw Error(EUserError.NOT_FOUND);
	// FIXME: Dangerous type coercion
	Object.entries(editedUser).forEach(([key, value]) => {
		(existingUser as any)[key] = value ?? (existingUser as any)[key];
	});
	const updatedUser = await existingUser.save();
	const userVO = buildDetailedUserVO(updatedUser.toObject());
	return userVO;
};

const buildUserVO = (user: TUser): TUserVO => {
	return {
		id: user.id ?? "",
		email: user.email ?? "",
		firstName: user.firstName ?? "",
		lastName: user.lastName ?? "",
	};
};

const buildDetailedUserVO = (user: TUser): TDetailedUserVO => {
	return {};
};

export const UserService = {
	buildUserVO,
	getUser,
	searchUsers,
	deleteUser,
	editUser,
};
