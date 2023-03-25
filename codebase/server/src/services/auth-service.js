const loginUser = async (email, password) => {};

const refreshUser = async (refreshToken) => {};

const logoutUser = async (email) => {};

const registerUser = async (user) => {};

const forgotPassword = async (email) => {};

const resetPassword = async (resetToken, newPassword) => {};

const changePassword = async (email, newPassword, oldPassword) => {};

export const AuthService = {
	loginUser,
	refreshUser,
	logoutUser,
	registerUser,
	forgotPassword,
	resetPassword,
	changePassword,
};
