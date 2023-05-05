import { Schema } from "express-validator";

export const checkReactionType: Schema = {
	reactionType: {
		isIn: { options: [["likes", "dislikes"]] },
		errorMessage: "reactionType must be 'likes' or 'dislikes'",
		in: ["params"],
	},
};

export const checkCommentId: Schema = {
	commentId: {
		isMongoId: true,
		errorMessage: "commentId must be an ObjectId",
		in: ["params"],
	},
};

export const checkPostId: Schema = {
	postId: {
		isMongoId: true,
		errorMessage: "postId must be an ObjectId",
		in: ["params"],
	},
};

export const checkLocationId: Schema = {
	locationId: {
		isMongoId: true,
		errorMessage: "locationId must be an ObjectId",
		in: ["params"],
	},
};

export const checkTripPackageId: Schema = {
	tripPackageId: {
		isMongoId: true,
		errorMessage: "tripPackageId must be an ObjectId",
		in: ["params"],
	},
};

export const checkLocationFields = (optional?: true): Schema => {
	return {
		name: {
			isString: true,
			errorMessage: "name must be a String",
			optional,
			in: ["body"],
		},
		imageUrl: {
			isURL: true,
			errorMessage: "imageUrl must be a URL",
			optional,
			in: ["body"],
		},
		"price.base": {
			isNumeric: true,
			errorMessage: "base must be a numeric value",
			optional,
			in: ["body"],
		},
		"price.personDay": {
			isNumeric: true,
			errorMessage: "personDay must be a numeric value",
			optional,
			in: ["body"],
		},
		"address.addressLine1": {
			isString: true,
			errorMessage: "addressLine1 must be a String",
			optional,
			in: ["body"],
		},
		"address.addressLine2": {
			isString: true,
			errorMessage: "addressLine2 must be a String",
			optional,
			in: ["body"],
		},
		city: {
			isString: true,
			errorMessage: "city must be a String",
			optional,
			in: ["body"],
		},
		province: {
			isString: true,
			errorMessage: "province must be a String",
			optional,
			in: ["body"],
		},
	};
};

export const checkTripPackageFields = (optional?: true): Schema => {
	return {
		name: {
			isString: true,
			errorMessage: "name must be a String",
			optional,
			in: ["body"],
		},
	};
};

export const checkPageOptions: Schema = {
	pageNum: {
		isInt: true,
		errorMessage: "pageNum must be an Integer",
		optional: true,
		in: ["body"],
	},
	pageSize: {
		isInt: true,
		errorMessage: "pageSize must be an Integer",
		optional: true,
		in: ["body"],
	},
	sortField: {
		isString: true,
		errorMessage: "sortField must be a String",
		optional: true,
		in: ["body"],
	},
	sortDir: {
		isIn: {
			options: ["asc", "desc"],
		},
		errorMessage: "sortDir must be either 'asc' or 'desc'",
		optional: true,
		in: ["body"],
	},
};

export const checkUserDetails: Schema = {
	"user-id": {
		isMongoId: true,
		errorMessage: "user-id header must be an ObjectId and present",
		in: ["headers"],
	},
	"user-roles": {
		isArray: true,
		errorMessage: "user-roles header must have an array of valid roles",
		in: ["headers"],
	},
};
