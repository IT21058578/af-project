import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { VITE_API_URI } from "../../constants/constants";

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		baseUrl: VITE_API_URI,
		prepareHeaders: (headers, { getState }) => {
			const accessToken = getState().auth.tokens.accessToken;
			if (accessToken) {
				headers.set("Authorization", `Bearer ${accessToken}`);
			}
			return headers;
		},
	}),
});
