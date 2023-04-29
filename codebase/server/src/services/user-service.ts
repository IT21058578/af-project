import { TUser } from "../types/model-types";

const getUser = async (id: string) => {};

const getUsers = async (searchConfig: string) => {};

const deleteUser = async (id: string) => {};

const editUser = async (id: string, editedUser: Partial<TUser>) => {};

export const UserService = { getUser, getUsers, deleteUser, editUser };
