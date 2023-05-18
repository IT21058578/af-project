const buildUserVO = (user) => {
    if (user === null)
        return {};
    return {
        id: user._id ?? "",
        email: user.email ?? "",
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
    };
};
const buildDetailedUserVO = (user) => {
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
        roles: user.roles,
        updatedAt: user.updatedAt,
    };
};
export const UserTransformer = {
    buildDetailedUserVO,
    buildUserVO,
};
