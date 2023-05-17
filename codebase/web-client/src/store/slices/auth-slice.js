import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {
		firstName: undefined,
		lastName: undefined,
		mobile: undefined,
		email: undefined,
	},
	tokens: {
		accessToken: undefined,
		refreshToken: undefined,
	},
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload.user;
			state.tokens = payload.tokens;
		},
		setTokens: (state, { payload }) => {
			state.tokens = payload;
		},
		removeUser: (state) => {
			state = initialState;
		},
	},
});

export const authReducer = authSlice.reducer;
export const { removeUser, setUser, setTokens } = authSlice.actions;
