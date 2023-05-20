import { Comment } from "../../dist/models/comment-model";
import { CommentTransformer } from "../../dist/transformers/comment-transformer";
import jest from "jest-mock";
import { CommentService } from "../../dist/services/comment-service";
import { ECommentError } from "../../dist/constants/constants";
import { PageUtils } from "../../dist/utils/mongoose-utils";

describe("CommentService", () => {
	describe("getComment", () => {
		it("should return CommentVO by id", async () => {
			// Given
			const commentId = "id";
			const commentText = "text";
			const existingComment = {
				_id: commentId,
				text: commentText,
				save: () => {},
				toObject: () => {},
			};
			const expectedComment = { id: commentId, text: commentText };

			CommentTransformer.buildCommentVO = jest
				.fn()
				.mockResolvedValue(expectedComment);
			Comment.findById = jest.fn().mockResolvedValue(existingComment);

			// When
			const result = await CommentService.getComment(commentId);

			// Then
			expect(Comment.findById).toHaveBeenCalledWith(commentId);
			expect(Comment.findById).toHaveBeenCalledTimes(1);
			expect(result).toEqual(expectedComment);
		});
		it("should throw if id is invalid", async () => {
			// Given
			const commentId = "id";
			Comment.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(CommentService.getComment(commentId)).rejects.toThrow(
				ECommentError.TRIP_PKG_NOT_FOUND
			);
		});
	});

	describe("searchComments", () => {
		it("should return a page of comments", async () => {
			const commentId = "id";
			const commentText = "text";
			const existingComment = { _id: commentId, text: commentText };
			const expectedComment = { id: commentId, text: commentText };

			Comment.aggregate = jest
				.fn()
				.mockResolvedValue([{ data: [existingComment], rest: {} }]);
			CommentTransformer.buildCommentVO = jest
				.fn()
				.mockResolvedValue(expectedComment);
			PageUtils.buildPage = jest
				.fn()
				.mockReturnValue({ metadata: {}, content: [expectedComment] });

			// When
			const result = await CommentService.searchComments({});

			// Then
			expect(result).toEqual({ metadata: {}, content: [expectedComment] });
		});
	});

	describe("editComments", () => {
		it("should return the edited comment", async () => {
			// Given
			const commentId = "id";
			const commentText = "text";
			const commentImageData = "image";
			const existingComment = {
				_id: commentId,
				text: commentText,
				save: () => ({
					...editedComment,
					toObject: () => {},
				}),
			};

			const editedComment = {
				_id: commentId,
				text: commentText,
			};
			const expectedComment = {
				id: commentId,
				text: commentText,
				imageData: commentImageData,
			};

			CommentTransformer.buildCommentVO = jest
				.fn()
				.mockResolvedValue(expectedComment);
			Comment.findById = jest.fn().mockResolvedValue(existingComment);

			// When
			const result = await CommentService.editComment(
				commentId,
				{ imageData: commentImageData },
				"user-id"
			);

			// Then
			expect(Comment.findById).toHaveBeenCalledWith(commentId);
			expect(Comment.findById).toHaveBeenCalledTimes(1);
			expect(result).toEqual(expectedComment);
		});

		it("should throw if id is invalid", async () => {
			// Given
			const commentId = "id";
			Comment.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(CommentService.editComment(commentId)).rejects.toThrow(
				ECommentError.TRIP_PKG_NOT_FOUND
			);
		});
	});

	describe("deleteComment", () => {
		it("should delete a comment", async () => {
			const userId = "user-id";
			const commentId = "id";
			const commentText = "text";
			const existingComment = {
				_id: commentId,
				createdById: userId,
				text: commentText,
				deleteOne: jest.fn(),
			};

			Comment.findById = jest.fn().mockResolvedValue(existingComment);

			// When
			await CommentService.deleteComment(commentId, { roles: [], id: userId });

			// Then
			expect(Comment.findById).toHaveBeenCalledWith(commentId);
			expect(Comment.findById).toHaveBeenCalledTimes(1);
			expect(existingComment.deleteOne).toHaveBeenCalledTimes(1);
		});
		it("should throw if id is invalid", async () => {
			// Given
			const commentId = "id";
			Comment.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(CommentService.deleteComment(commentId)).rejects.toThrow(
				ECommentError.TRIP_PKG_NOT_FOUND
			);
		});
	});

	describe("createComment", () => {
		it("should create comment", async () => {
			const commentId = "id";
			const commentText = "text";
			const postId = "post-id";
			const createdById = "user-id";
			const newComment = {
				postId,
				createdById,
				text: commentText,
			};
			const createdComment = {
				_id: commentId,
				postId,
				createdById,
				text: commentText,
			};
			const expectedComment = {
				id: commentId,
				postId,
				createdById,
				text: commentText,
			};

			Comment.create = jest
				.fn()
				.mockResolvedValue({ ...createdComment, toObject: () => {} });
			CommentTransformer.buildCommentVO = jest
				.fn()
				.mockResolvedValue(expectedComment);

			// When
			const result = await CommentService.createComment(newComment, commentId);

			// Then
			expect(result).toEqual(expectedComment);
			expect(CommentTransformer.buildCommentVO).toHaveBeenCalledTimes(1);
			expect(Comment.create).toHaveBeenCalledTimes(1);
		});
	});
});
