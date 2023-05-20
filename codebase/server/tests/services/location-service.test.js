import { Location } from "../../dist/models/location-model";
import { LocationTransformer } from "../../dist/transformers/location-transformer";
import jest from "jest-mock";
import { LocationService } from "../../dist/services/location-service";
import { ELocationError } from "../../dist/constants/constants";
import { PageUtils } from "../../dist/utils/mongoose-utils";

describe("LocationService", () => {
	describe("getLocation", () => {
		it("should return LocationVO by id", async () => {
			// Given
			const locationId = "id";
			const locationName = "name";
			const existingLocation = {
				_id: locationId,
				name: locationName,
				save: () => {},
				toObject: () => {},
			};
			const expectedLocation = { id: locationId, name: locationName };

			LocationTransformer.buildLocationVO = jest
				.fn()
				.mockResolvedValue(expectedLocation);
			Location.findById = jest.fn().mockResolvedValue(existingLocation);

			// When
			const result = await LocationService.getLocation(locationId);

			// Then
			expect(Location.findById).toHaveBeenCalledWith(locationId);
			expect(Location.findById).toHaveBeenCalledTimes(1);
			expect(result).toEqual(expectedLocation);
		});
		it("should throw if id is invalid", async () => {
			// Given
			const locationId = "id";
			Location.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(LocationService.getLocation(locationId)).rejects.toThrow(
				ELocationError.TRIP_PKG_NOT_FOUND
			);
		});
	});

	describe("searchLocations", () => {
		it("should return a page of locations", async () => {
			const locationId = "id";
			const locationName = "name";
			const existingLocation = { _id: locationId, name: locationName };
			const expectedLocation = { id: locationId, name: locationName };

			Location.aggregate = jest
				.fn()
				.mockResolvedValue([{ data: [existingLocation], rest: {} }]);
			LocationTransformer.buildLocationVO = jest
				.fn()
				.mockResolvedValue(expectedLocation);
			PageUtils.buildPage = jest
				.fn()
				.mockReturnValue({ metadata: {}, content: [expectedLocation] });

			// When
			const result = await LocationService.searchLocations({});

			// Then
			expect(result).toEqual({ metadata: {}, content: [expectedLocation] });
		});
	});

	describe("editLocations", () => {
		it("should return the edited location", async () => {
			// Given
			const locationId = "id";
			const locationName = "name";
			const locationImageData = "image";
			const existingLocation = {
				_id: locationId,
				name: locationName,
				save: () => ({
					...editedLocation,
					toObject: () => {},
				}),
			};

			const editedLocation = {
				_id: locationId,
				name: locationName,
			};
			const expectedLocation = {
				id: locationId,
				name: locationName,
				imageData: locationImageData,
			};

			LocationTransformer.buildLocationVO = jest
				.fn()
				.mockResolvedValue(expectedLocation);
			Location.findById = jest.fn().mockResolvedValue(existingLocation);

			// When
			const result = await LocationService.editLocation(
				locationId,
				{ imageData: locationImageData },
				"user-id"
			);

			// Then
			expect(Location.findById).toHaveBeenCalledWith(locationId);
			expect(Location.findById).toHaveBeenCalledTimes(1);
			expect(result).toEqual(expectedLocation);
		});

		it("should throw if id is invalid", async () => {
			// Given
			const locationId = "id";
			Location.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(LocationService.editLocation(locationId)).rejects.toThrow(
				ELocationError.TRIP_PKG_NOT_FOUND
			);
		});
	});

	describe("deleteLocation", () => {
		it("should delete a location", async () => {
			const locationId = "id";
			const locationName = "name";
			const existingLocation = {
				_id: locationId,
				name: locationName,
				deleteOne: jest.fn(),
			};

			Location.findById = jest.fn().mockResolvedValue(existingLocation);

			// When
			await LocationService.deleteLocation(locationId);

			// Then
			expect(Location.findById).toHaveBeenCalledWith(locationId);
			expect(Location.findById).toHaveBeenCalledTimes(1);
			expect(existingLocation.deleteOne).toHaveBeenCalledTimes(1);
		});
		it("should throw if id is invalid", async () => {
			// Given
			const locationId = "id";
			Location.findById = jest.fn().mockResolvedValue(null);

			// When-Then
			await expect(LocationService.deleteLocation(locationId)).rejects.toThrow(
				ELocationError.TRIP_PKG_NOT_FOUND
			);
		});
	});

	describe("createLocation", () => {
		it("should create location", async () => {
			const locationId = "id";
			const locationName = "name";
			const newLocation = {
				name: locationName,
			};
			const createdLocation = {
				_id: locationId,
				name: locationName,
			};
			const expectedLocation = {
				id: locationId,
				name: locationName,
			};

			Location.create = jest
				.fn()
				.mockResolvedValue({ ...createdLocation, toObject: () => {} });
			LocationTransformer.buildLocationVO = jest
				.fn()
				.mockResolvedValue(expectedLocation);

			// When
			const result = await LocationService.createLocation(newLocation);

			// Then
			expect(result).toEqual(expectedLocation);
			expect(LocationTransformer.buildLocationVO).toHaveBeenCalledTimes(1);
			expect(Location.create).toHaveBeenCalledTimes(1);
		});
	});
});
