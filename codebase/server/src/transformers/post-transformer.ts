import { TPost } from "../types/model-types.js";
import { TPostVO } from "../types/vo-types.js";
import { User } from "../models/user-model.js";
import { UserTransformer } from "./user-transformer.js";

const buildPostVO = async (
	post: TPost,
	authorizedUserId: string = ""
): Promise<TPostVO> => {
	const [createdByUser, lastUpdatedByUser] = await Promise.all([
		User.findById(post.createdById),
		User.findById(post.lastUpdatedById),
	]);
	const createdBy = UserTransformer.buildUserVO(createdByUser);
	const lastUpdatedBy = UserTransformer.buildUserVO(lastUpdatedByUser);

	return {
		id: post._id,
		title: post.title,
		text: post.text,
		imageData: post.imageData,
		isFeatured: post.isFeatured,
		createdBy,
		createdAt: post.createdAt,
		lastUpdatedBy,
		updatedAt: post.updatedAt,
		tags: post.tags,
		isLiked: post.likes.includes(authorizedUserId),
		isDisliked: post.dislikes.includes(authorizedUserId),
		dislikeCount: post.dislikes.length,
		likeCount: post.likes.length,
		views: post.views,
		controverisalScore: post.controverisalScore,
		hotScore: post.hotScore,
	};
};

export const PostTransformer = {
	buildPostVO,
};
