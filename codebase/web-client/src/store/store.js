import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/base-api-slice";
import { authReducer } from "./slices/auth-slice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaults) => getDefaults().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
