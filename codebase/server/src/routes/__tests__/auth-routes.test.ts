import supertest from "supertest";
import { server } from "../..";
import { StatusCodes } from "http-status-codes";
import { User } from "../../models/user-model";
import bcrypt from "bcrypt";
import { TUser } from "../../types/model-types";

const BASE_AUTH_URI = "/api/v1/auth";

beforeAll(async () => {
	const app = server;
});

describe(`POST /register`, () => {
	const url = BASE_AUTH_URI + "/register";
	const existingEmail = "testexisting@test.com";
	const testUser: Partial<TUser> = {
		firstName: "Test",
		lastName: "Test",
		email: "test@test.com",
		password: "test",
		isSubscribed: true,
		dateOfBirth: new Date(),
		mobile: "1231231234",
	};

	beforeAll(async () => {
		await User.create({
			email: existingEmail,
			password: await bcrypt.hash("", 10),
		});
	});

	it("should return an OK with no response when succesful", async () => {
		const response = await supertest(server).post(url).send(testUser);
		expect(response.statusCode).toBe(StatusCodes.OK);
		expect(response.body).toStrictEqual({});
	});

	describe("exceptions", () => {
		it("should return a BAD_REQUEST when given invalid data", async () => {
			let firstAlteredUser = { ...testUser, email: undefined };
			let response = await supertest(server).post(url).send(firstAlteredUser);
			expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);

			let secondAlteredUser = { ...testUser, password: undefined };
			response = await supertest(server).post(url).send(secondAlteredUser);
			expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);

			let thirdAlteredUser = { ...testUser, email: undefined };
			response = await supertest(server).post(url).send(thirdAlteredUser);
			expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);

			response = await supertest(server).post(url).send({});
			expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
		});
		it("should return a CONFLICT when user exists", async () => {
			const existingUser = { ...testUser, email: existingEmail };
			let response = await supertest(server).post(url).send(existingUser);
			expect(response.statusCode).toBe(StatusCodes.CONFLICT);
		});
	});
});

describe(`POST /login`, () => {
	const url = BASE_AUTH_URI + "/login";
	const authorizedUserEmail = "testauthorized@test.com";
	const unauthorizedUserEmail = "testunauthorized@test.com";
	const userPassword = "test";

	beforeAll(async () => {
		await User.create({
			firstName: "",
			lastName: "",
			roles: [],
			mobile: "",
			email: authorizedUserEmail,
			password: await bcrypt.hash(userPassword, 10),
			isAuthorized: true,
		});

		await User.create({
			email: unauthorizedUserEmail,
			password: await bcrypt.hash(userPassword, 10),
			isAuthorized: false,
		});
	});

	it("should return an OK with tokens when valid credentials", async () => {
		const response = await supertest(server)
			.post(url)
			.send({ email: authorizedUserEmail, password: userPassword });
		expect(response.statusCode).toBe(StatusCodes.OK);
		expect(response.body).toHaveProperty("tokens.accessToken");
		expect(response.body).toHaveProperty("tokens.refreshToken");
		expect(response.body).toHaveProperty("user.id");
		expect(response.body).toHaveProperty("user.roles");
		expect(response.body).toHaveProperty("user.lastName");
		expect(response.body).toHaveProperty("user.firstName");
		expect(response.body).toHaveProperty("user.mobile");
		expect(response.body).toHaveProperty("user.email");
	});

	describe("exceptions", () => {
		it("should return a BAD_REQUEST when given invalid data", async () => {
			const response = await supertest(server)
				.post(url)
				.send({ email: "test@test", password: userPassword });
			expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
		});
		it("should return a UNAUTHORIZED when valid credentials that do not match", async () => {
			const response = await supertest(server)
				.post(url)
				.send({ email: authorizedUserEmail, password: "1234test" });
			expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
		});
		it("should return a CONFLICT when user exists but unauthorized", async () => {
			const response = await supertest(server)
				.post(url)
				.send({ email: unauthorizedUserEmail, password: userPassword });
			expect(response.statusCode).toBe(StatusCodes.CONFLICT);
		});
	});
});

describe(`DELETE /logout`, () => {
	const url = BASE_AUTH_URI + "/logout";
	const loginUrl = BASE_AUTH_URI + "/login";
	const loggedInUserEmail = "testlogin@test.com";
	const loggedOutUserEmail = "testlogout@test.com";
	const userPassword = "test";
	let accessToken = "";

	beforeAll(async () => {
		await User.create({
			email: loggedInUserEmail,
			password: await bcrypt.hash(userPassword, 10),
			isAuthorized: true,
		});
		await User.create({
			email: loggedOutUserEmail,
			password: await bcrypt.hash(userPassword, 10),
			isAuthorized: true,
		});
		const response = await supertest(server)
			.post(loginUrl)
			.send({ email: loggedInUserEmail, password: userPassword });
		accessToken = response.body.tokens.accessToken;
	});

	it("should return an NO_CONTENT when successful", async () => {
		await supertest(server)
			.delete(url)
			.set("Authorization", `Bearer ${accessToken}`)
			.expect(StatusCodes.NO_CONTENT);
	});

	describe("exceptions", () => {
		it("should return a CONFLICT when already logged out", async () => {
			await supertest(server)
				.delete(url)
				.set("Authorization", `Bearer ${accessToken}`)
				.expect(StatusCodes.CONFLICT);
		});
	});
});

describe(`PUT /refresh`, () => {
	const url = BASE_AUTH_URI + "/refresh";
	const loginUrl = BASE_AUTH_URI + "/login";
	const loggedInUserEmail = "testlogin@test.com";
	const otherUserEmail = "testother@test.com";
	const userPassword = "test";
	let oldRefreshToken = "";
	let accessToken = "";
	let refreshToken = "";
	let otherAccessToken = "";

	beforeAll(async () => {
		await User.create({
			email: loggedInUserEmail,
			password: await bcrypt.hash(userPassword, 10),
			isAuthorized: true,
		});
		await User.create({
			email: otherUserEmail,
			password: await bcrypt.hash(userPassword, 10),
			isAuthorized: true,
		});
		let response = await supertest(server)
			.post(loginUrl)
			.send({ email: loggedInUserEmail, password: userPassword });
		oldRefreshToken = response.body.tokens.refreshToken;
		response = await supertest(server)
			.post(loginUrl)
			.send({ email: loggedInUserEmail, password: userPassword });
		accessToken = response.body.tokens.accessToken;
		refreshToken = response.body.tokens.refreshToken;

		// For testing access-refresh token match
		response = await supertest(server)
			.post(loginUrl)
			.send({ email: otherUserEmail, password: userPassword });
		otherAccessToken = response.body.tokens.accessToken;
	});

	it("should return an OK with tokens when valid token", async () => {
		const { body } = await supertest(server)
			.put(url)
			.set("Authorization", `Bearer ${accessToken}`)
			.send({ refreshToken })
			.expect(StatusCodes.OK);
		expect(body).toHaveProperty("accessToken");
		expect(body).toHaveProperty("refreshToken");
	});

	describe("exceptions", () => {
		it("should return an UNAUTHORIZED when refresh token is outdated", async () => {
			await supertest(server)
				.put(url)
				.set("Authorization", `Bearer ${accessToken}`)
				.send({ refreshToken: oldRefreshToken })
				.expect(StatusCodes.UNAUTHORIZED);
		});
		it("should return an UNAUTHORIZED when refresh token id does not match with access token id", async () => {
			await supertest(server)
				.put(url)
				.set("Authorization", `Bearer ${otherAccessToken}`)
				.send({ refreshToken: oldRefreshToken })
				.expect(StatusCodes.UNAUTHORIZED);
		});
		it("should return a BAD_REQUEST when body is invalid", async () => {
			await supertest(server)
				.put(url)
				.set("Authorization", `Bearer ${accessToken}`)
				.send({})
				.expect(StatusCodes.BAD_REQUEST);
		});
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
