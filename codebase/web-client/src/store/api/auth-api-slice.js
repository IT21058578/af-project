import { baseApi } from "./base-api-slice";

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		loginUser: builder.mutation({}),
		registerUser: builder.mutation({}),
	}),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
