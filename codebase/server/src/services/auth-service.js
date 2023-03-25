const loginUser = async (email, password) => { };

const logoutUser = async (email) => { };

const registerUser = async (user) => { };

const forgotPassword = async (email) => { };

const resetPassword = async (resetToken, newPassword) => { };

const changePassword = async (email, newPassword, oldPassword) => { };

export const AuthService = { loginUser, logoutUser, registerUser, forgotPassword, resetPassword, changePassword };