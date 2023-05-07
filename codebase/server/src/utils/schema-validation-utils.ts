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
			optional,
			isString: true,
			errorMessage: "name must be a String",
			in: ["body"],
		},
		totalDistance: {
			optional,
			isNumeric: true,
			errorMessage: "totalDistance must be a Number",
			in: ["body"],
		},
		"price.perPerson": {
			optional,
			isNumeric: true,
			errorMessage: "perPerson must be a Number",
			in: ["body"],
		},
		"price.perPersonFood": {
			optional,
			isNumeric: true,
			errorMessage: "perPersonFood must be a Number",
			in: ["body"],
		},
		"price.transport.group": {
			optional,
			isNumeric: true,
			errorMessage: "group must be a Number",
			in: ["body"],
		},
		"price.transport.van": {
			optional,
			isNumeric: true,
			errorMessage: "van must be a Number",
			in: ["body"],
		},
		"price.transport.car": {
			optional,
			isNumeric: true,
			errorMessage: "car must be a Number",
			in: ["body"],
		},
		"price.lodging.threeStar": {
			optional,
			isNumeric: true,
			errorMessage: "threeStar must be a Number",
			in: ["body"],
		},
		"price.lodging.fourStar": {
			optional,
			isNumeric: true,
			errorMessage: "fourStar must be a Number",
			in: ["body"],
		},
		"price.lodging.fiveStar": {
			optional,
			isNumeric: true,
			errorMessage: "fiveStar must be a Number",
			in: ["body"],
		},
		"discount.value": {
			optional,
			isNumeric: true,
			errorMessage: "value must be a Number",
			in: ["body"],
		},
		"discount.type": {
			optional,
			isIn: { options: ["FLAT", "PERCENT"] },
			errorMessage: "type must be either be 'FLAT' or 'PERCENT'",
			in: ["body"],
		},
		"price.*.locationId": {
			optional,
			isMongoId: true,
			errorMessage: "locationId must be an ObjectId",
			in: ["body"],
		},
		"price.*.activities.*": {
			optional,
			isString: true,
			errorMessage: "Each value in activites must be a String",
			in: ["body"],
		},
		"limitedDateRange.startDate": {
			optional: true,
			isDate: true,
			errorMessage: "startDate must be a Date",
			in: ["body"],
		},
		"limitedDateRange.endDate": {
			optional: true,
			isDate: true,
			errorMessage: "endDate must be a Date",
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
