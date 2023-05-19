import { POSTS_URL } from "../../constants/constants";
import { baseApi } from "./base-api-slice";

export const postsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getPost: builder.query({
			query: ({ postId }) => ({
				url: `${POSTS_URL}/${postId}`,
			}),
		}),
		searchPosts: builder.query({
			query: ({ ...searchOptions }) => ({
				url: `${POSTS_URL}/search?${new URLSearchParams(
					searchOptions
				).toString()}`,
			}),
		}),
		createPost: builder.mutation({
			query: (body) => ({
				url: `${POSTS_URL}/`,
				method: "POST",
				body,
			}),
		}),
		editPost: builder.mutation({
			query: ({ postId, ...body }) => ({
				url: `${POSTS_URL}/${postId}`,
				method: "PUT",
				body,
			}),
		}),
		deletePost: builder.mutation({
			query: ({ postId }) => ({
				url: `${POSTS_URL}/${postId}`,
				method: "DELETE",
			}),
		}),
		likeDislikePost: builder.mutation({
			query: ({ postId, reactionType }) => ({
				url: `${POSTS_URL}/${postId}/${reactionType}`,
				method: "POST",
			}),
		}),
		removeLikeDislikePost: builder.mutation({
			query: ({ postId, reactionType }) => ({
				url: `${POSTS_URL}/${postId}/${reactionType}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useLazyGetPostQuery,
	useLazySearchPostsQuery,
	useCreatePostMutation,
	useEditPostMutation,
	useDeletePostMutation,
	useLikeDislikePostMutation,
	useRemoveLikeDislikePostMutation,
} = postsApi;
