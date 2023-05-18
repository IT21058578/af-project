import { TripPackage } from "../../dist/models/package/package-model";
import proxyquire from "proxyquire";
import jest from "jest-mock";
import { TripPackageService } from "../../dist/services/package-service";
import { ETripPackageError } from "../../dist/constants/constants";

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

			const TripPackage = {
				findById: jest.fn().mockResolvedValue(existingTripPackage),
			};

			const { TripPackageService } = proxyquire(
				"../../dist/services/package-service",
				{
					"../models/package/package-model": { TripPackage },
				}
			);

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
});
