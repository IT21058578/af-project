import { EUserError } from "../constants/constants.js";
import { User } from "../models/user-model.js";
import { TLocation } from "../types/model-types.js";
import { TLocationVO, TUserVO } from "../types/vo-types.js";
import { UserTransformer } from "./user-transformer.js";

const buildLocationVO = async (location: TLocation): Promise<TLocationVO> => {
	const [createdByUser, lastUpdatedByUser] = await Promise.all([
		User.findById(location.createdById),
		User.findById(location.lastUpdatedById),
	]);

	let createdBy: TUserVO | {};
	if (createdByUser !== null) {
		createdBy = UserTransformer.buildUserVO(createdByUser);
	} else {
		throw Error(EUserError.NOT_FOUND);
	}

	let lastUpdatedBy: TUserVO | {};
	if (lastUpdatedByUser !== null) {
		lastUpdatedBy = UserTransformer.buildUserVO(lastUpdatedByUser);
	} else {
		throw Error(EUserError.NOT_FOUND);
	}

	return {
		id: location._id,
		name: location.name,
		createdAt: location.createdAt,
		updatedAt: location.updatedAt,
		address: location.address,
		imageData: location.imageData,
		createdBy,
		lastUpdatedBy,
	};
};

export const LocationTransformer = {
	buildLocationVO,
};
