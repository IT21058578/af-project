import { COMMENT_WEIGHT, VIEW_WEIGHT } from "../constants/constants.js";
import { Post } from "../models/post/post-model.js";
import initializeLogger from "../utils/logger.js";
import { schedule, ScheduledTask } from "node-cron";

const log = initializeLogger(import.meta.url.split("/").pop() || "");
const scheduledTasks: ScheduledTask[] = [];

/**
 * This function should be called periodically to upate the scores of a piece of content.
 * It is called periodically to reduce resource consumption that would happen
 * if we were to calculate this on post view/comment.
 */
const doPeriodicPostScoreUpdate = async () => {
	log.info("Starting to update post scores...");
	Post.aggregate([
		{
			$lookup: {
				from: "Comment",
				localField: "_id",
				foreignField: "postId",
				as: "comments",
			},
		},
		{
			$set: {
				commentCount: { $size: "$comments" },
				age: { $subtract: ["$$NOW", "$createdAt"] },
			},
		},
		{
			$set: {
				mappedAge: {
					// A modified sigmoid function to map values from 0 to +infinity
					// to between 1 and 10. With an s curve
					$add: [
						{
							$divide: [
								9,
								{ $add: [1, { $pow: [1, { $add: ["$age", +5] }] }] },
							],
						},
						1,
					],
				},
			},
		},
		{
			$set: {
				controversialScore: {
					$divide: [
						{
							$add: [
								{ $multiply: ["$commentCount", 1] },
								{ $multiply: ["$views", 1] },
							],
						},
						"$age",
					],
				},
				hotScore: {
					$divide: [
						{
							$add: [{ $size: "$likes" }, { $size: "$dislikes" }],
						},
						"$mappedAge",
					],
				},
			},
		},
		{
			$merge: {
				into: "Post",
			},
		},
	]).then((result) => {
		log.info(`Finishing running post score update`);
	});
};

/**
 * This function should be called periodically to take a snapshot of how the
 * views and scores of a piece of content have changed with time. This is the basic backbone of
 * an analytics system
 */
const doPeriodicPostScoresSnapshot = () => {
	log.info("Starting to take post score snapshot...");
	// TODO: Implement Mechanism
};

export const startScheduledTasks = () => {
	log.info("Starting scheduled tasks...");
	scheduledTasks.push(
		...[
			schedule(`* */1 * * *`, doPeriodicPostScoreUpdate, { runOnInit: true }),
			schedule(`* */1 * * *`, doPeriodicPostScoresSnapshot, {
				runOnInit: true,
			}),
		]
	);
};
