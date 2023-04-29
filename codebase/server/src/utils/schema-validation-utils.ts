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
