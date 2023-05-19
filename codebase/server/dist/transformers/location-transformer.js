import { EUserError } from "../constants/constants.js";
import { User } from "../models/user-model.js";
import { UserTransformer } from "./user-transformer.js";
const buildLocationVO = async (location) => {
    const [createdByUser, lastUpdatedByUser] = await Promise.all([
        User.findById(location.createdById),
        User.findById(location.lastUpdatedById),
    ]);
    let createdBy;
    if (createdByUser !== null) {
        createdBy = UserTransformer.buildUserVO(createdByUser);
    }
    else {
        throw Error(EUserError.NOT_FOUND);
    }
    let lastUpdatedBy;
    if (lastUpdatedByUser !== null) {
        lastUpdatedBy = UserTransformer.buildUserVO(lastUpdatedByUser);
    }
    else {
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
