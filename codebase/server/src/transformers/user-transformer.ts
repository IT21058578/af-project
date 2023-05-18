import { TUser } from "../types/model-types.js";
import { TDetailedUserVO, TUserVO } from "../types/vo-types.js";

const buildUserVO = (user: TUser | null): TUserVO | {} => {
	if (user === null) return {};
	return {
		id: user._id ?? "",
		email: user.email ?? "",
		firstName: user.firstName ?? "",
		lastName: user.lastName ?? "",
	};
};

const buildDetailedUserVO = (user: TUser): TDetailedUserVO => {
	return {
		id: user._id ?? "",
		email: user.email ?? "",
		firstName: user.firstName ?? "",
		lastName: user.lastName ?? "",
		createdAt: user.createdAt,
		dateOfBirth: user.dateOfBirth,
		isSubscribed: user.isSubscribed,
		lastLoggedAt: user.lastLoggedAt,
		mobile: user.mobile,
		roles: user.roles as any,
		updatedAt: user.updatedAt,
	};
};

export const UserTransformer = {
	buildDetailedUserVO,
	buildUserVO,
};
