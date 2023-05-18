import { EUserError, Role } from "../constants/constants.js";
import { User } from "../models/user-model.js";
import { UserTransformer } from "../transformers/user-transformer.js";
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
	const user = await User.findById(id);
	if (user === null) throw Error(EUserError.NOT_FOUND);
	const userVO = UserTransformer.buildDetailedUserVO(user.toObject());
	return userVO;
};

const searchUsers = async (userSearchOptions: TExtendedPageOptions<TUser>) => {
	const { data, ...rest } = (
		await User.aggregate(buildPaginationPipeline(userSearchOptions as any))
	)[0] as any as IPaginationResult<TUser>;
	const userVOs = await Promise.all(
		data.map(async (user) => {
			return UserTransformer.buildUserVO(user);
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

	const existingUser = await User.findById(userId);
	if (existingUser == null) throw Error(EUserError.NOT_FOUND);
	// FIXME: Dangerous type coercion
	Object.entries(editedUser).forEach(([key, value]) => {
		(existingUser as any)[key] = value ?? (existingUser as any)[key];
	});
	const updatedUser = await existingUser.save();
	const userVO = UserTransformer.buildDetailedUserVO(updatedUser.toObject());
	return userVO;
};
export const UserService = {
	getUser,
	searchUsers,
	deleteUser,
	editUser,
};
