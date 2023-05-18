import { TripPackage } from "../../dist/models/package/package-model";
import { PackageTransformer } from "../../dist/transformers/package-transformer";
import jest from "jest-mock";
import { TripPackageService } from "../../dist/services/package-service";
import { ETripPackageError } from "../../dist/constants/constants";
import { PageUtils } from "../../dist/utils/mongoose-utils";

describe("TripPackageService", () => {
	describe("getTripPackage", () => {
		it("should return TripPackageVO by id", async () => {
			// Given
			const tripPackageId = "id";
			const tripPackageName = "name";
			const existingTripPackage = {
				_id: tripPackageId,
				name: tripPackageName,
				save: () => {},
				toObject: () => {},
			};
			const expectedTripPackage = { id: tripPackageId, name: tripPackageName };

			PackageTransformer.buildTripPackageVO = jest
				.fn()
				.mockResolvedValue(expectedTripPackage);
			TripPackage.findById = jest.fn().mockResolvedValue(existingTripPackage);

			// When
			const result = await TripPackageService.getTripPackage(tripPackageId);

			// Then
			expect(TripPackage.findById).toHaveBeenCalledWith(tripPackageId);
			expect(TripPackage.findById).toHaveBeenCalledTimes(1);
			expect(result).toEqual(expectedTripPackage);
		});
		it("should throw if id is invalid", async () => {
			// Given
			const tripPackageId = "id";
			TripPackage.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(
				TripPackageService.getTripPackage(tripPackageId)
			).rejects.toThrow(ETripPackageError.TRIP_PKG_NOT_FOUND);
		});
	});

	describe("searchTripPackages", () => {
		it("should return a page of tripPackages", async () => {
			const tripPackageId = "id";
			const tripPackageName = "name";
			const existingTripPackage = { _id: tripPackageId, name: tripPackageName };
			const expectedTripPackage = { id: tripPackageId, name: tripPackageName };

			TripPackage.aggregate = jest
				.fn()
				.mockResolvedValue([{ data: [existingTripPackage], rest: {} }]);
			PackageTransformer.buildTripPackageVO = jest
				.fn()
				.mockResolvedValue(expectedTripPackage);
			PageUtils.buildPage = jest
				.fn()
				.mockReturnValue({ metadata: {}, content: [expectedTripPackage] });

			// When
			const result = await TripPackageService.searchTripPackages({});

			// Then
			expect(result).toEqual({ metadata: {}, content: [expectedTripPackage] });
		});
	});

	describe("editTripPackages", () => {
		it("should return the edited tripPackage", async () => {
			// Given
			const tripPackageId = "id";
			const tripPackageName = "name";
			const tripPackageDescription = "description";
			const existingTripPackage = {
				_id: tripPackageId,
				name: tripPackageName,
				save: () => ({
					...editedTripPackage,
					toObject: () => {},
				}),
			};

			const editedTripPackage = {
				_id: tripPackageId,
				name: tripPackageName,
				description: tripPackageDescription,
			};
			const expectedTripPackage = {
				id: tripPackageId,
				name: tripPackageName,
				description: tripPackageDescription,
			};

			PackageTransformer.buildTripPackageVO = jest
				.fn()
				.mockResolvedValue(expectedTripPackage);
			TripPackage.findById = jest.fn().mockResolvedValue(existingTripPackage);

			// When
			const result = await TripPackageService.editTripPackage(
				tripPackageId,
				{ description: tripPackageDescription },
				"user-id"
			);

			// Then
			expect(TripPackage.findById).toHaveBeenCalledWith(tripPackageId);
			expect(TripPackage.findById).toHaveBeenCalledTimes(1);
			expect(result).toEqual(expectedTripPackage);
		});

		it("should throw if id is invalid", async () => {
			// Given
			const tripPackageId = "id";
			TripPackage.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(
				TripPackageService.editTripPackage(tripPackageId)
			).rejects.toThrow(ETripPackageError.TRIP_PKG_NOT_FOUND);
		});
	});

	describe("deleteTripPackage", () => {
		it("should delete a trip package", async () => {
			const tripPackageId = "id";
			const tripPackageName = "name";
			const existingTripPackage = {
				_id: tripPackageId,
				name: tripPackageName,
				deleteOne: jest.fn(),
			};

			TripPackage.findById = jest.fn().mockResolvedValue(existingTripPackage);

			// When
			await TripPackageService.deleteTripPackage(tripPackageId);

			// Then
			expect(TripPackage.findById).toHaveBeenCalledWith(tripPackageId);
			expect(TripPackage.findById).toHaveBeenCalledTimes(1);
			expect(existingTripPackage.deleteOne).toHaveBeenCalledTimes(1);
		});
		it("should throw if id is invalid", async () => {
			// Given
			const tripPackageId = "id";
			TripPackage.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(
				TripPackageService.deleteTripPackage(tripPackageId)
			).rejects.toThrow(ETripPackageError.TRIP_PKG_NOT_FOUND);
		});
	});

	describe("createTripPackage", () => {
		it("should create tripPackage", async () => {
			const tripPackageId = "id";
			const tripPackageName = "name";
			const newTripPackage = {
				name: tripPackageName,
			};
			const createdTripPackage = {
				_id: tripPackageId,
				name: tripPackageName,
			};
			const expectedTripPackage = {
				id: tripPackageId,
				name: tripPackageName,
			};

			TripPackage.create = jest
				.fn()
				.mockResolvedValue({ ...createdTripPackage, toObject: () => {} });
			PackageTransformer.buildTripPackageVO = jest
				.fn()
				.mockResolvedValue(expectedTripPackage);

			// When
			const result = await TripPackageService.createTripPackage(newTripPackage);

			// Then
			expect(result).toEqual(expectedTripPackage);
			expect(PackageTransformer.buildTripPackageVO).toHaveBeenCalledTimes(1);
			expect(TripPackage.create).toHaveBeenCalledTimes(1);
		});
	});

	describe("calculatePrice", () => {
		it("should calculate the correct price", () => {
			const price = {
				perPerson: 100,
				lodging: {
					THREE_STAR: 50,
				},
				transport: {
					CAR: 200,
				},
			};
			const pricingOptions = {
				persons: 2,
				lodging: "THREE_STAR",
				transport: "CAR",
				withFood: false,
			};
			const expectedPrice = 450;

			const calculatedPrice = TripPackageService.calculatePrice(
				{ price },
				pricingOptions
			);

			expect(calculatedPrice).toBe(expectedPrice);
		});

		it("should throw an error when price is undefined", () => {
			const price = undefined;
			const pricingOptions = {
				persons: 2,
				lodging: "THREE_STAR",
				transport: "CAR",
				withFood: false,
			};

			expect(() => {
				TripPackageService.calculatePrice({ price }, pricingOptions);
			}).toThrowError(ETripPackageError.PRICE_UNDEFINED);
		});
	});
});
