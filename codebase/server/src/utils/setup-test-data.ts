import mongoose from "mongoose";
import initializeLogger from "./logger.js";
import { MONGODB_URI } from "../constants/constants.js";
import { faker } from "@faker-js/faker";
import { User } from "../models/user-model.js";
import { Post } from "../models/post-model.js";
import { Comment } from "../models/comment-model.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const selectRandom = <T>(arr: T[], exclude?: T[]) => {
	return arr.filter(
		(val) => faker.datatype.boolean() && !exclude?.includes(val)
	);
};

const selectRandomOne = <T>(arr: T[]) => {
	const max = arr.length;
	return arr[faker.datatype.number({ min: 0, max })];
};

mongoose
	.connect(MONGODB_URI || "", { dbName: "test-af-project" })
	.then(async () => {
		log.info("Established connection");

		log.info("Clearing old users");
		await User.deleteMany();
		await Post.deleteMany();
		await Comment.deleteMany();

		log.info("Saving new users");
		const savedUserIds: string[] = [];
		for (const _i of Array(10)) {
			const user = new User({
				roles: ["USER"],
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				isAuthorized: true,
				isSubscribed: faker.datatype.boolean(),
				lastLoggedAt: faker.date.recent(),
				createdAt: faker.date.past(),
				mobile: faker.phone.number(),
				updatedAt: faker.date.recent(),
				authorizationToken: faker.datatype.uuid(),
				resetToken: faker.datatype.uuid(),
				dateOfBirth: faker.date.birthdate(),
			});
			const savedUser = await user.save();
			savedUserIds.push(savedUser.id);
		}

		log.info("Saving new posts");
		const savedPostIds: string[] = [];
		for (const _i of Array(30)) {
			const likes = selectRandom(savedUserIds);
			const post = new Post({
				likes: likes,
				dislikes: selectRandom(savedUserIds, likes),
				tags: faker.datatype.array(),
				text: faker.lorem.paragraphs(),
				image: faker.internet.url(),
				title: faker.lorem.sentence(),
				userId: selectRandomOne(savedUserIds),
				updatedAt: faker.date.recent(),
				createdAt: faker.date.past(),
			});
			const savedPost = await post.save();
			savedPostIds.push(savedPost.id);
		}

		log.info("Saving new comments");
		const savedCommentIds: string[] = [];
		for (const _i of Array(60)) {
			const likes = selectRandom(savedUserIds);
			const comment = new Comment({
				likes: likes,
				dislikes: selectRandom(savedUserIds, likes),
				text: faker.lorem.paragraphs(),
				userId: selectRandomOne(savedUserIds),
				updatedAt: faker.date.recent(),
				postId: selectRandomOne(savedPostIds),
				createdAt: faker.date.past(),
				parentId: selectRandomOne(savedCommentIds),
			});
			const savedComment = await comment.save();
			savedCommentIds.push(savedComment.id);
		}

		log.info("Finished all tasks");
		await mongoose.disconnect();
	});
