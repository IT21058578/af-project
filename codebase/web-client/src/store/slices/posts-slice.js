import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	post: {
		createdById: undefined,
		lastUpdatedById: undefined,
		title: undefined,
		text: undefined,
        imageData: undefined,
        tags: undefined,
        likes: undefined,
        dislikes: undefined,
        views: undefined,
        controverisalScore: undefined,
        hotScore: undefined,
        isFeatured: undefined,
	},
	tokens: {
		accessToken: undefined,
		refreshToken: undefined,
	},
};

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setPost: (state, { payload }) => {
			state.post = payload.post;
			state.tokens = payload.tokens;
		},
		setTokens: (state, { payload }) => {
			state.tokens = payload;
		},
		removePost: (state) => {
			state = initialState;
		},
	},
});

export const postsReducer = postsSlice.reducer;
export const { removePost, setPost, setTokens } = postsSlice.actions;
