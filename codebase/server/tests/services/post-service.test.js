import { Post } from "../../dist/models/post/post-model";
import { PostTransformer } from "../../dist/transformers/post-transformer";
import jest from "jest-mock";
import { PostService } from "../../dist/services/post-service";
import { EPostError } from "../../dist/constants/constants";
import { PageUtils } from "../../dist/utils/mongoose-utils";

describe("PostService", () => {
	describe("getPost", () => {
		it("should return PostVO by id", async () => {
			// Given
			const postId = "id";
			const postName = "name";
			const existingPost = {
				_id: postId,
				title: postName,
				save: () => {},
				toObject: () => {},
			};
			const expectedPost = { id: postId, title: postName };

			PostTransformer.buildPostVO = jest.fn().mockResolvedValue(expectedPost);
			Post.findById = jest.fn().mockResolvedValue(existingPost);

			// When
			const result = await PostService.getPost(postId);

			// Then
			expect(Post.findById).toHaveBeenCalledWith(postId);
			expect(Post.findById).toHaveBeenCalledTimes(1);
			expect(result).toEqual(expectedPost);
		});
		it("should throw if id is invalid", async () => {
			// Given
			const postId = "id";
			Post.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(PostService.getPost(postId)).rejects.toThrow(
				EPostError.NOT_FOUND
			);
		});
	});

	describe("searchPosts", () => {
		it("should return a page of posts", async () => {
			const postId = "id";
			const postName = "name";
			const existingPost = { _id: postId, title: postName };
			const expectedPost = { id: postId, title: postName };

			Post.aggregate = jest
				.fn()
				.mockResolvedValue([{ data: [existingPost], rest: {} }]);
			PostTransformer.buildPostVO = jest.fn().mockResolvedValue(expectedPost);
			PageUtils.buildPage = jest
				.fn()
				.mockReturnValue({ metadata: {}, content: [expectedPost] });

			// When
			const result = await PostService.searchPosts({});

			// Then
			expect(result).toEqual({ metadata: {}, content: [expectedPost] });
		});
	});

	describe("editPosts", () => {
		it("should return the edited post", async () => {
			// Given
			const postId = "id";
			const postName = "name";
			const postImageData = "image";
			const existingPost = {
				_id: postId,
				title: postName,
				save: () => ({
					...editedPost,
					toObject: () => {},
				}),
			};

			const editedPost = {
				_id: postId,
				title: postName,
			};
			const expectedPost = {
				id: postId,
				title: postName,
				imageData: postImageData,
			};

			PostTransformer.buildPostVO = jest.fn().mockResolvedValue(expectedPost);
			Post.findById = jest.fn().mockResolvedValue(existingPost);

			// When
			const result = await PostService.editPost(
				postId,
				{ imageData: postImageData },
				"user-id"
			);

			// Then
			expect(Post.findById).toHaveBeenCalledWith(postId);
			expect(Post.findById).toHaveBeenCalledTimes(1);
			expect(result).toEqual(expectedPost);
		});

		it("should throw if id is invalid", async () => {
			// Given
			const postId = "id";
			Post.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(PostService.editPost(postId)).rejects.toThrow(
				EPostError.NOT_FOUND
			);
		});
	});

	describe("deletePost", () => {
		it("should delete a post", async () => {
			const userId = "user-id";
			const postId = "id";
			const postName = "name";
			const existingPost = {
				_id: postId,
				title: postName,
				createdById: userId,
				deleteOne: jest.fn(),
			};

			Post.findById = jest.fn().mockResolvedValue(existingPost);

			// When
			await PostService.deletePost(postId, { roles: [], id: userId });

			// Then
			expect(Post.findById).toHaveBeenCalledWith(postId);
			expect(Post.findById).toHaveBeenCalledTimes(1);
			expect(existingPost.deleteOne).toHaveBeenCalledTimes(1);
		});
		it("should throw if id is invalid", async () => {
			// Given
			const postId = "id";
			Post.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(PostService.deletePost(postId)).rejects.toThrow(
				EPostError.NOT_FOUND
			);
		});
	});

	describe("createPost", () => {
		it("should create post", async () => {
			const postId = "id";
			const postName = "name";
			const newPost = {
				title: postName,
			};
			const createdPost = {
				_id: postId,
				title: postName,
			};
			const expectedPost = {
				id: postId,
				title: postName,
			};

			Post.create = jest
				.fn()
				.mockResolvedValue({ ...createdPost, toObject: () => {} });
			PostTransformer.buildPostVO = jest.fn().mockResolvedValue(expectedPost);

			// When
			const result = await PostService.createPost(newPost);

			// Then
			expect(result).toEqual(expectedPost);
			expect(PostTransformer.buildPostVO).toHaveBeenCalledTimes(1);
			expect(Post.create).toHaveBeenCalledTimes(1);
		});
	});
});
