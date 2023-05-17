import { COMMENTS_URL } from "../../constants/constants";
import { baseApi } from "./base-api-slice";

export const commentsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getComment: builder.query({
			query: ({ commentId }) => ({
				url: `${COMMENTS_URL}/${commentId}`,
			}),
		}),
		searchComments: builder.query({
			query: ({ searchOptions }) => ({
				url: `${COMMENTS_URL}/search?${new URLSearchParams(
					searchOptions
				).toString()}`,
			}),
		}),
		createComment: builder.mutation({
			query: ({ postId, parentCommentId, text }) => ({
				url: `${POSTS_URL}/${postId}/comments/`,
				body: { parentCommentId, text },
				method: "POST",
			}),
		}),
		editComment: builder.mutation({
			query: ({ commentId, text }) => ({
				url: `${COMMENTS_URL}/${commentId}`,
				body: { text },
				method: "PUT",
			}),
		}),
		deleteComment: builder.mutation({
			query: ({ commentId }) => ({
				url: `${COMMENTS_URL}/${commentId}`,
				method: "DELETE",
			}),
		}),
		likeDislikeComment: builder.mutation({
			query: ({ commentId, reactionType }) => ({
				url: `${COMMENTS_URL}/${commentId}/${reactionType}`,
				method: "POST",
			}),
		}),
		removeLikeDislikeComment: builder.mutation({
			query: ({ commentId, reactionType }) => ({
				url: `${COMMENTS_URL}/${commentId}/${reactionType}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useLazyGetCommentQuery,
	useCreateCommentMutation,
	useEditCommentMutation,
	useDeleteCommentMutation,
	useLikeDislikeCommentMutation,
	useRemoveLikeDislikeCommentMutation,
} = commentsApi;
