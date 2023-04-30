describe(`POST /login`, () => {
	it.todo("should return an OK with tokens when valid credentials");

	describe("exceptions", () => {
		it.todo("should return a BAD_REQUEST when given invalid data");
		it.todo(
			"should return a UNAUTHORIZED when valid credentials that do not match"
		);
		it.todo("should return a CONFLICT when user exists but unauthorized");
	});
});

describe(`PUT /refresh`, () => {
	it.todo("should return an OK with tokens when valid token");

	describe("exceptions", () => {
		it.todo("should return a BAD_REQUEST when given invalid data");
		it.todo("should return a UNAUTHORIZED when invalid credentials");
	});
});

describe(`DELETE /logout`, () => {
	it.todo("should return an NO_CONTENT with when succesful");

	describe("exceptions", () => {
		it.todo("should return a UNAUTHORIZED when invalid credentials");
	});
});

describe(`POST /register`, () => {
	it.todo("should return an OK with no response when succesful");

	describe("exceptions", () => {
		it.todo("should return a BAD_REQUEST when given invalid data");
		it.todo("should return a CONFLICT when user exists");
	});
});

describe(`PUT /reset-password`, () => {
	it.todo("should return an OK with no response when succesful");

	describe("exceptions", () => {
		it.todo("should return a BAD_REQUEST when given invalid data");
	});
});

describe(`PUT /forgot-password`, () => {
	it.todo("should return an OK with no response when succesful");

	describe("exceptions", () => {
		it.todo("should return a BAD_REQUEST when given invalid data");
		it.todo("should return a UNAUTHORIZED when invalid token");
	});
});

describe(`PUT /change-password`, () => {
	it.todo("should return an OK with no response when succesful");

	describe("exceptions", () => {
		it.todo("should return a BAD_REQUEST when given invalid data");
		it.todo("should return a UNAUTHORIZED when not authorized user");
	});
});
