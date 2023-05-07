import { USERS_URL } from "../../constants/constants";
import { baseApi } from "./base-api-slice";

export const usersApi = baseApi.injectEndpoints({
	/** TODO: None of these are implemented yet */
	endpoints: (builder) => ({
		getUser: builder.query({
			query: ({ userId }) => ({
				url: `${USERS_URL}/${userId}`,
			}),
		}),
		searchUsers: builder.query({
			query: ({ ...searchOptions }) => ({
				url: `${USERS_URL}/search?${new URLSearchParams(
					searchOptions
				).toString()}`,
			}),
		}),
		editUser: builder.mutation({
			query: ({ userId, ...body }) => ({
				url: `${USERS_URL}/${userId}`,
				method: "PUT",
				body,
			}),
		}),
		deleteUser: builder.mutation({
			query: ({ userId }) => ({
				url: `${USERS_URL}/${userId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useLazyGetUserQuery,
	useLazySearchUsersQuery,
	useEditUserMutation,
	useDeleteUserMutation,
} = usersApi;
