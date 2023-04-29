describe("loginUser()", () => {
	it.todo("should return user when given valid credentials");

	describe("exceptions", () => {
		it.todo("should throw when user does not exist");
		it.todo("should throw when user password is incorrect");
	});
});

describe("logoutUser()", () => {
	it.todo("should delete user login details");

	describe("exceptions", () => {
		it.todo("should throw when user does not exist");
	});
});

describe("registerUser()", () => {
	it.todo("should register user when given valid credentials");

	describe("exceptions", () => {
		it.todo("should throw when user already exists");
	});
});

describe("forgotPassword()", () => {
	it.todo("should create a new reset token");

	describe("exceptions", () => {
		it.todo("should throw when user does not exist");
	});
});

describe("resetPassword()", () => {
	it.todo("should change user password");

	describe("exceptions", () => {
		it.todo("should throw when user does not exist");
		it.todo("should throw when reset token is invalid");
	});
});

describe("changePassword()", () => {
	it.todo("should change user password");

	describe("exceptions", () => {
		it.todo("should throw when user does not exist");
		it.todo("should throw when user old password is incorrect");
	});
});
