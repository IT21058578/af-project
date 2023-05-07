import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user-service.js";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
	} catch (error) {
		if (false) {
		} else {
			return res.status(500).send();
		}
	}
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
	} catch (error) {
		if (false) {
		} else {
			return res.status(500).send();
		}
	}
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
	} catch (error) {
		if (false) {
		} else {
			return res.status(500).send();
		}
	}
};

const editUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
	} catch (error) {}
};

export const UserController = { getUser, getUsers, deleteUser, editUser };
