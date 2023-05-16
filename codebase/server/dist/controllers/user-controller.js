import { UserService } from "../services/user-service.js";
import initializeLogger from "../utils/logger.js";
import { handleControllerError } from "../utils/misc-utils.js";
import { StatusCodes } from "http-status-codes";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const getUser = async (req, res, next) => {
    try {
        log.info("Intercepted getUser request");
        const { userId } = req.params;
        const existingUser = await UserService.getUser(userId);
        log.info("Succesfully processed getUser request");
        return res.status(StatusCodes.OK).send(existingUser);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const searchUsers = async (req, res, next) => {
    try {
        log.info("Intercepted searchUsers request");
        const userSearchOptions = req.query;
        const userPage = await UserService.searchUsers(userSearchOptions);
        log.info("Succesfully processed searchUsers request");
        return res.status(StatusCodes.OK).send(userPage);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const deleteUser = async (req, res, next) => {
    try {
        log.info("Intercepted deleteUser request");
        const { userId } = req.params;
        const authorizedUserId = req.headers["user-id"];
        const authorizedUserRoles = req.headers["user-roles"];
        await UserService.deleteUser(userId, {
            id: authorizedUserId,
            roles: authorizedUserRoles,
        });
        log.info("Succesfully processed deleteUser request");
        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const editUser = async (req, res, next) => {
    try {
        log.info("Intercepted editUser request");
        const { userId } = req.params;
        const editedUser = req.body;
        const authorizedUserId = req.headers["user-id"];
        const authorizedUserRoles = req.headers["user-roles"];
        const updatedUser = await UserService.editUser(userId, editedUser, {
            id: authorizedUserId,
            roles: authorizedUserRoles,
        });
        log.info("Succesfully processed editUser request");
        return res.status(StatusCodes.OK).send(updatedUser);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
export const UserController = { getUser, searchUsers, deleteUser, editUser };
