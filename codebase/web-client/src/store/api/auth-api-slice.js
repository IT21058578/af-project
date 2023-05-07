import { baseApi } from "./base-api-slice";

const AUTH_URL = "/v1/auth";

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		loginUser: builder.mutation({
			query: ({ email, password }) => ({
				url: `${AUTH_URL}/login`,
				body: { email, password },
			}),
		}),
		logoutUser: builder.mutation({
			query: () => ({
				url: `${AUTH_URL}/logout`,
			}),
		}),
		refreshUser: builder.mutation({
			query: ({ refreshToken }) => ({
				url: `${AUTH_URL}/refresh`,
				body: { refreshToken },
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
			}),
		}),
		resetUserPassword: builder.mutation({
			query: ({ email, resetToken, newPassword }) => ({
				url: `${AUTH_URL}/reset-password`,
				body: { email, resetToken, newPassword },
			}),
		}),
		forgotUserPassword: builder.mutation({
			query: ({ email }) => ({
				url: `${AUTH_URL}/forgot-password`,
				body: { email },
			}),
		}),
		changeUserPassword: builder.mutation({
			query: ({ oldPassword, newPassword }) => ({
				url: `${AUTH_URL}/change-password`,
				body: { oldPassword, newPassword },
			}),
		}),
	}),
});

export const {
	useLoginUserMutation,
	useLogoutUserMutation,
	useRefreshUserMutation,
	useRegisterUserMutation,
	useResetUserPasswordMutation,
	useChangeUserPasswordMutation,
	useForgotUserPasswordMutation,
} = authApi;
