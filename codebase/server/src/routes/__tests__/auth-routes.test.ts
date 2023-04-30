import supertest from "supertest";
import { server } from "../..";
import { StatusCodes } from "http-status-codes";

describe(`POST /login`, () => {
	const url = "/api/v1/users/login";
	it("should return an OK with tokens when valid credentials", async () => {
		const response = await supertest(server)
			.post(url)
			.send({ email: "test@test.com", password: "test" });
		expect(response.statusCode).toBe(StatusCodes.OK);
	});

	describe("exceptions", () => {
		it("should return a BAD_REQUEST when given invalid data", async () => {
			const response = await supertest(server)
				.post(url)
				.send({ email: "test@test", password: "test" });
			expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
		});
		it("should return a UNAUTHORIZED when valid credentials that do not match", async () => {
			const response = await supertest(server)
				.post(url)
				.send({ email: "test@test.com", password: "1234test" });
			expect(response.statusCode).toBe(StatusCodes.OK);
		});
		it("should return a CONFLICT when user exists but unauthorized", async () => {
			const response = await supertest(server)
				.post(url)
				.send({ email: "test@test.com", password: "test" });
			expect(response.statusCode).toBe(StatusCodes.CONFLICT);
		});
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
