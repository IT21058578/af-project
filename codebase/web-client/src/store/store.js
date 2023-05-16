import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/base-api-slice";
import { authReducer } from "./slices/auth-slice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaults) => getDefaults().concat(baseApi.middleware),
});
