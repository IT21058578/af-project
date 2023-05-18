import { EUserError, Role } from "../constants/constants.js";
import { User } from "../models/user-model.js";
import { UserTransformer } from "../transformers/user-transformer.js";
import initializeLogger from "../utils/logger.js";
import { buildPage, buildPaginationPipeline } from "../utils/mongoose-utils.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const getUser = async (id) => {
    const user = await User.findById(id);
    if (user === null)
        throw Error(EUserError.NOT_FOUND);
    const userVO = UserTransformer.buildDetailedUserVO(user.toObject());
    return userVO;
};
const searchUsers = async (userSearchOptions) => {
    const { data, ...rest } = (await User.aggregate(buildPaginationPipeline(userSearchOptions)))[0];
    const userVOs = await Promise.all(data.map(async (user) => {
        return UserTransformer.buildUserVO(user);
    }));
    return buildPage({ data: userVOs, ...rest }, userSearchOptions);
};
const deleteUser = async (userId, authorizedUser) => {
    if (!authorizedUser.roles.includes(Role.ADMIN) &&
        authorizedUser.id !== userId) {
        throw Error(EUserError.UNAUTHORIZED);
    }
    await User.findByIdAndDelete(userId);
};
const editUser = async (userId, editedUser, authorizedUser) => {
    if (!authorizedUser.roles.includes(Role.ADMIN) &&
        authorizedUser.id !== userId) {
        throw Error(EUserError.UNAUTHORIZED);
    }
    const existingUser = await User.findById(userId);
    if (existingUser == null)
        throw Error(EUserError.NOT_FOUND);
    // FIXME: Dangerous type coercion
    Object.entries(editedUser).forEach(([key, value]) => {
        existingUser[key] = value ?? existingUser[key];
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
