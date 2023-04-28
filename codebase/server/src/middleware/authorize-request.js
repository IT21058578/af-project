import { ReasonPhrases, StatusCodes } from "http-status-codes";

const authorizeRequest = (req, res, next) => (allowedRoles) => {
	let hasAllowedRole = false;
	const userRoles = req.headers["user-roles"];
	const userId = req.headers["user-id"];
	for (const role of userRoles) {
		if (allowedRoles?.includes(role)) {
			hasAllowedRole = true;
			break;
		}
	}
	if (hasAllowedRole) next();
	else {
		log.warn(`A user with id ${userId} tried to access a protected route`);
		res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
	}
};

export default authorizeRequest;
