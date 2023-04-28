const getPost = async (id) => {};

const searchPosts = async (postSearchOptions) => {};

const createPost = async (post) => {};

const editPost = async (id, updatedPost) => {};

const deletePost = async (id) => {};

const createlikeDislikePost = async (id, reactionType) => {};

const editlikeDislikePost = async (id, reactionType) => {};

const deleteLikeDislikePost = async (id) => {};

export const PostService = {
	getPost,
	searchPosts,
	createPost,
	editPost,
	deletePost,
	createlikeDislikePost,
	editlikeDislikePost,
	deleteLikeDislikePost,
};
