const getComment = async (id) => {};

const createComment = async (comment) => {};

const editComment = async (id, updatedComment) => {};

const deleteComment = async (id) => {};

const createlikeDislikeComment = async (id, reactionType) => {};

const editlikeDislikeComment = async (id, reactionType) => {};

const deleteLikeDislikeComment = async (id) => {};

export const CommentService = {
	getComment,
	createComment,
	editComment,
	deleteComment,
	createlikeDislikeComment,
	editlikeDislikeComment,
	deleteLikeDislikeComment,
};
