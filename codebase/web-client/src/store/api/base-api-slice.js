import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { VITE_API_URI } from "../../constants/constants";
import { removeUser } from "../slices/auth-slice";

const baseQuery = fetchBaseQuery({
	baseUrl: VITE_API_URI,
	prepareHeaders: (headers, { getState }) => {
		const accessToken = getState().auth.tokens.accessToken;
		if (accessToken) {
			headers.set("Authorization", `Bearer ${accessToken}`);
		}
		return headers;
	},
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	console.log(data);
	if (
		result.error &&
		result.error.status === 401 &&
		result.data?.errors?.code === "ERR_JWT_EXPIRED"
	) {
		const refreshResult = await baseQuery(
			"/v1/auth/refresh",
			api,
			extraOptions
		);
		if (refreshResult.data?.refreshToken !== undefined) {
			api.dispatch(setTokens(refreshResult.data));
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(removeUser());
		}
	}
	return result;
};

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
});
