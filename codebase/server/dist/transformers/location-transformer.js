import { User } from "../models/user-model.js";
import { UserTransformer } from "./user-transformer.js";
const buildLocationVO = async (location) => {
    if (location === null)
        return {};
    const users = await Promise.all([
        User.findById(location.createdById),
        User.findById(location.lastUpdatedById),
    ]);
    const [createdBy, lastUpdatedBy] = users.map((user) => UserTransformer.buildUserVO(user));
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
