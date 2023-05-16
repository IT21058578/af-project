import { ELodging } from "../constants/constants.js";
import {
	COMMENT_WEIGHT,
	ETransport,
	VIEW_WEIGHT,
} from "../constants/constants.js";
import { Post } from "../models/post/post-model.js";
import initializeLogger from "../utils/logger.js";
import { schedule, ScheduledTask } from "node-cron";

const log = initializeLogger(import.meta.url.split("/").pop() || "");
const scheduledTasks: ScheduledTask[] = [];

/**
 * This function should be called periodically to take a snapshot of how the
 * views and scores of a piece of content have changed with time. This is the basic backbone of
 * an analytics system
 */
const doPeriodicPackageScoreSnapshot = async () => {
	log.info("Starting to take package usage snapshot...");
	Post.aggregate([
		{
			$lookup: {
				from: "Booking",
				localField: "_id",
				foreignField: "package.id",
				as: "bookings",
			},
		},
		{
			$project: {
				views: 1,
				age: { $subtract: ["$$NOW", "$createdAt"] },
				totalBookingCount: { $size: "$bookings" },
				createdAt: new Date(),
				specificBookingCount: {
					transport: {
						...[
							Object.values(ETransport).map((type) => ({
								[type]: {
									$reduce: {
										input: "$bookings",
										initialValue: 0,
										in: {
											$add: [
												"$$value",
												{
													$cond: [
														{
															$eq: ["$$this.package.transport", type],
														},
														1,
														0,
													],
												},
											],
										},
									},
								},
							})),
						],
					},
					lodging: {
						...[
							Object.values(ELodging).map((type) => ({
								[type]: {
									$reduce: {
										input: "$bookings",
										initialValue: 0,
										in: {
											$add: [
												"$$value",
												{
													$cond: [
														{
															$eq: ["$$this.package.lodging", type],
														},
														1,
														0,
													],
												},
											],
										},
									},
								},
							})),
						],
					},
				},
			},
		},
		// {
		// 	$out: "PackageAnalyticsSnapshot",
		// },
	]).then((res) => {
		log.info(`Finished taking package usage snapshot`);
	});
};

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
				into: "posts",
			},
		},
	]).then(() => {
		log.info(`Finished running post score update`);
	});
};

/**
 * This function should be called periodically to take a snapshot of how the
 * views and scores of a piece of content have changed with time. This is the basic backbone of
 * an analytics system
 */
const doPeriodicPostScoresSnapshot = () => {
	log.info("Starting to take post score snapshot...");
	Post.aggregate([
		{
			$project: {
				postId: { $toString: "$_id" },
				createdAt: new Date(),
				likeCount: { $size: "$likes" },
				dislikeCount: { $size: "$dislikes" },
				views: 1,
				controverisalScore: 1,
				hotScore: 1,
			},
		},
		{
			$out: "postanalyticsssnapshots",
		},
	]).then(() => {
		log.info(`Finished taking post score snapshot`);
	});
};

export const startScheduledTasks = () => {
	log.info("Starting scheduled tasks...");
	scheduledTasks.push(
		...[
			schedule(`0 0 */1 * * *`, doPeriodicPostScoreUpdate, { runOnInit: true }),
			// schedule(`* * * * *`, doPeriodicPostScoresSnapshot, {
			// 	runOnInit: true,
			// }),
			// schedule(`* * * * *`, doPeriodicPackageScoreSnapshot, {
			// 	runOnInit: true,
			// }),
		]
	);
};
