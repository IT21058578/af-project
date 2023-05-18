import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/base-api-slice";
import { authReducer } from "./slices/auth-slice";
import { packageReducer } from "./slices/package-slice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		package:packageReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaults) => getDefaults().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
