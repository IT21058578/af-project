import { baseApi } from "./base-api-slice";

const AUTH_URL = "/v1/auth";

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		loginUser: builder.mutation({
			query: ({ email, password }) => ({
				url: `${AUTH_URL}/login`,
				body: { email, password },
				method: "POST",
			}),
		}),
		logoutUser: builder.mutation({
			query: () => ({
				url: `${AUTH_URL}/logout`,
				method: "DELETE",
			}),
		}),
		authorizeUser: builder.mutation({
			query: ({ authorizationToken, email }) => ({
				url: `${AUTH_URL}/authorize?${new URLSearchParams({
					authorizationToken,
					email,
				}).toString()}`,
				method: "PUT",
			}),
		}),
		refreshUser: builder.mutation({
			query: ({ refreshToken }) => ({
				url: `${AUTH_URL}/refresh`,
				body: { refreshToken },
				method: "PUT",
			}),
		}),
		registerUser: builder.mutation({
			query: ({
				email,
				password,
				firstName,
				lastName,
				mobile,
				dateOfBirth,
				isSubscribed,
			}) => ({
				url: `${AUTH_URL}/register`,
				body: {
					email,
					password,
					firstName,
					lastName,
					mobile,
					dateOfBirth,
					isSubscribed,
				},
				method: "POST",
			}),
		}),
		resetUserPassword: builder.mutation({
			query: ({ email, resetToken, newPassword }) => ({
				url: `${AUTH_URL}/reset-password`,
				body: { email, resetToken, newPassword },
				method: "PUT",
			}),
		}),
		forgotUserPassword: builder.mutation({
			query: ({ email }) => ({
				url: `${AUTH_URL}/forgot-password`,
				body: { email },
				method: "PUT",
			}),
		}),
		changeUserPassword: builder.mutation({
			query: ({ oldPassword, newPassword }) => ({
				url: `${AUTH_URL}/change-password`,
				body: { oldPassword, newPassword },
				method: "PUT",
			}),
		}),
	}),
});

export const {
	useLoginUserMutation,
	useLogoutUserMutation,
	useRefreshUserMutation,
	useRegisterUserMutation,
	useAuthorizeUserMutation,
	useResetUserPasswordMutation,
	useChangeUserPasswordMutation,
	useForgotUserPasswordMutation,
} = authApi;
