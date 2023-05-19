import jest from "jest-mock";
import { EUserError, Role } from "../../dist/constants/constants";
import { PageUtils } from "../../dist/utils/mongoose-utils";
import { UserTransformer } from "../../dist/transformers/user-transformer";
import { User } from "../../dist/models/user-model";
import { UserService } from "../../dist/services/user-service";

describe("UserService", () => {
	describe("getUser", () => {
		it("should return UserVO by id", async () => {
			// Given
			const userId = "id";
			const userName = "name";
			const existingUser = {
				_id: userId,
				email: userName,
				save: () => {},
				toObject: () => {},
			};
			const expectedUser = { id: userId, email: userName };

			UserTransformer.buildDetailedUserVO = jest
				.fn()
				.mockResolvedValue(expectedUser);
			User.findById = jest.fn().mockResolvedValue(existingUser);

			// When
			const result = await UserService.getUser(userId);

			// Then
			expect(User.findById).toHaveBeenCalledWith(userId);
			expect(User.findById).toHaveBeenCalledTimes(1);
			expect(result).toEqual(expectedUser);
		});
		it("should throw if id is invalid", async () => {
			// Given
			const userId = "id";
			User.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(UserService.getUser(userId)).rejects.toThrow(
				EUserError.TRIP_PKG_NOT_FOUND
			);
		});
	});

	describe("searchUsers", () => {
		it("should return a page of users", async () => {
			const userId = "id";
			const userName = "name";
			const existingUser = { _id: userId, email: userName };
			const expectedUser = { id: userId, email: userName };

			User.aggregate = jest
				.fn()
				.mockResolvedValue([{ data: [existingUser], rest: {} }]);
			UserTransformer.buildUserVO = jest.fn().mockResolvedValue(expectedUser);
			PageUtils.buildPage = jest
				.fn()
				.mockReturnValue({ metadata: {}, content: [expectedUser] });

			// When
			const result = await UserService.searchUsers({});

			// Then
			expect(result).toEqual({ metadata: {}, content: [expectedUser] });
		});
	});

	describe("editUsers", () => {
		it("should return the edited user", async () => {
			// Given
			const userId = "user-id";
			const userName = "name";
			const userFirstName = "first-name";

			const editedUser = {
				_id: userId,
				email: userName,
				firstName: userFirstName,
			};

			const expectedUser = {
				id: userId,
				email: userName,
				firstName: userFirstName,
			};

			const existingUser = {
				_id: userId,
				email: userName,
				save: () =>
					Promise.resolve({
						...editedUser,
						toObject: () => {},
					}),
			};

			UserTransformer.buildDetailedUserVO = jest
				.fn()
				.mockResolvedValue(expectedUser);
			User.findById = jest.fn().mockResolvedValue(existingUser);

			// When
			const result = await UserService.editUser(
				userId,
				{ firstName: userFirstName },
				{
					id: "user-id",
					roles: [Role.USER],
				}
			);

			// Then
			expect(User.findById).toHaveBeenCalledWith(userId);
			expect(User.findById).toHaveBeenCalledTimes(1);
			expect(result).toEqual(expectedUser);
		});

		it("should throw if user has insufficient permissions", async () => {
			// Given
			const userId = "user-id";

			// When-Then
			await expect(
				UserService.editUser(
					userId,
					{},
					{
						id: "user-id-wrong",
						roles: [Role.USER],
					}
				)
			).rejects.toThrow(EUserError.UNAUTHORIZED);
		});

		it("should throw if id is invalid", async () => {
			// Given
			const userId = "id";
			User.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(UserService.editUser(userId)).rejects.toThrow(
				EUserError.TRIP_PKG_NOT_FOUND
			);
		});
	});

	describe("deleteUser", () => {
		it("should delete a trip package", async () => {
			const userId = "id";
			const userName = "name";
			const existingUser = {
				_id: userId,
				email: userName,
				deleteOne: jest.fn(),
			};

			User.findByIdAndDelete = jest.fn().mockResolvedValue(existingUser);

			// When
			await UserService.deleteUser(userId, {
				id: userId,
				roles: [Role.USER],
			});

			// Then
			expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
			expect(User.findByIdAndDelete).toHaveBeenCalledTimes(1);
		});

		it("should throw if user has insufficient permissions", async () => {
			// Given
			const userId = "user-id";

			// When-Then
			await expect(
				UserService.deleteUser(userId, {
					id: "user-id-wrong",
					roles: [Role.USER],
				})
			).rejects.toThrow(EUserError.UNAUTHORIZED);
		});
	});
});
