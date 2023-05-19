import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from './AuthContext';

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
		<Provider store={store}>
			<App />
		</Provider>
		</AuthProvider>
	</React.StrictMode>
);
