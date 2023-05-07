describe(`GET /:userId`, () => {
	it.todo("should return an OK with post when given valid id");

	describe("exceptions", () => {
		it.todo("should return a NOT FOUND when user does not exist");
	});
});

describe(`PUT /:userId`, () => {
	it.todo("should return an OK edited when given valid id and data");

	describe("exceptions", () => {
		it.todo("should return a BAD_REQUEST when given invalid data or id");
		it.todo("should return a UNAUTHORIZED error when user is unauthorized");
		it.todo("should return a NOT_FOUND  when user does not exist");
	});
});

describe(`DELETE /:userId`, () => {
	it.todo("should return OK when given valid id");

	describe("exceptions", () => {
		it.todo("should return an UNAUTHORIZED when user is unauthorized");
		it.todo("should return a NO_CONTENT when post does not exist");
	});
});
