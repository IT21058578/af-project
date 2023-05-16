import { ELodging, ETripPackageError, EUserError, } from "../constants/constants.js";
import { Location } from "../models/location-model.js";
import { TripPackage } from "../models/package/package-model.js";
import { User } from "../models/user-model.js";
import initializeLogger from "../utils/logger.js";
import { buildPage, buildPaginationPipeline } from "../utils/mongoose-utils.js";
import { LocationService } from "./location-service.js";
import { UserService } from "./user-service.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const getTripPackage = async (tripPackageId) => {
    const existingTripPackage = await TripPackage.findById(tripPackageId).exec();
    if (existingTripPackage == null)
        throw Error(ETripPackageError.TRIP_PKG_NOT_FOUND);
    existingTripPackage.views += 1;
    existingTripPackage.save();
    const tripPackageVO = await buildTripPackageVO(existingTripPackage.toObject());
    return tripPackageVO;
};
const searchTripPackages = async (tripPackageSearchOptions) => {
    const { data, ...rest } = (await TripPackage.aggregate(buildPaginationPipeline(tripPackageSearchOptions)))[0];
    const tripPackageVOs = await Promise.all(data.map(async (tripPackage) => {
        return await buildTripPackageVO(tripPackage);
    }));
    return buildPage({ ...rest, data: tripPackageVOs }, tripPackageSearchOptions);
};
const editTripPackage = async (tripPackageId, editedTripPackage, authorizedUserId) => {
    const existingTripPackage = await TripPackage.findById(tripPackageId).exec();
    if (existingTripPackage == null)
        throw Error(ETripPackageError.TRIP_PKG_NOT_FOUND);
    // FIXME: Dangerous type coercion
    Object.entries(editedTripPackage).forEach(([key, value]) => {
        existingTripPackage[key] =
            value ?? existingTripPackage[key];
    });
    existingTripPackage.lastUpdatedById = authorizedUserId;
    const updatedTripPackage = await existingTripPackage.save();
    const tripPackageVO = await buildTripPackageVO(updatedTripPackage.toObject());
    return tripPackageVO;
};
const deleteTripPackage = async (tripPackageId) => {
    const existingTripPackage = await TripPackage.findById(tripPackageId).exec();
    if (existingTripPackage == null)
        throw Error(ETripPackageError.TRIP_PKG_NOT_FOUND);
    await existingTripPackage.deleteOne();
};
const createTripPackage = async (newTripPackage, authorizedUserId) => {
    newTripPackage.createdById = authorizedUserId;
    newTripPackage.lastUpdatedById = authorizedUserId;
    const createdTripPackage = await TripPackage.create(newTripPackage);
    const tripPackageVO = await buildTripPackageVO(createdTripPackage.toObject());
    return tripPackageVO;
};
const calculatePrice = ({ price }, pricingOptions) => {
    if (price) {
        let result = 0;
        const { lodging, perPerson, perPersonFood, transport } = price;
        result += perPerson ?? 0 * pricingOptions.persons;
        result += lodging?.[pricingOptions.lodging] ?? 0;
        result += transport?.[pricingOptions.transport] ?? 0;
        result +=
            pricingOptions.lodging === ELodging.THREE_STAR && pricingOptions.withFood
                ? perPersonFood ?? 0 * pricingOptions.persons
                : 0;
        return result;
    }
    else {
        throw Error(ETripPackageError.PRICE_UNDEFINED);
    }
};
const buildTripPackageVO = async (tripPackage) => {
    // Start fetching locations
    const locationVOPromises = [];
    for (const { locationId } of tripPackage.plan) {
        // We are pushing a promise of a called getter function.
        // This function could easily be elsewhere, this is for conciseness
        locationVOPromises.push((async () => {
            const location = await Location.findById(locationId);
            return LocationService.buildLocationVO(location);
        })());
    }
    // Start fetching and wait for both users
    const [createdByUser, lastUpdatedByUser] = await Promise.all([
        User.findById(tripPackage.createdById),
        User.findById(tripPackage.lastUpdatedById),
    ]);
    createdByUser?._id;
    let createdBy;
    if (createdByUser !== null) {
        createdBy = UserService.buildUserVO(createdByUser);
    }
    else {
        throw Error(EUserError.NOT_FOUND);
    }
    let lastUpdatedBy;
    if (lastUpdatedByUser !== null) {
        lastUpdatedBy = UserService.buildUserVO(lastUpdatedByUser);
    }
    else {
        throw Error(EUserError.NOT_FOUND);
    }
    const plan = [];
    const locationVOs = await Promise.all(locationVOPromises);
    locationVOs.forEach((item, idx) => {
        plan.push({
            ...item,
            activities: tripPackage.plan.at(idx)?.activities ?? [],
        });
    });
    return {
        id: tripPackage._id ?? "",
        name: tripPackage.name,
        description: tripPackage.description,
        createdBy,
        createdAt: tripPackage.createdAt,
        lastUpdatedBy,
        updatedAt: tripPackage.updatedAt,
        price: tripPackage.price,
        discount: tripPackage.discount,
        limitedDateRange: tripPackage.limitedDateRange,
        totalDistance: tripPackage.totalDistance,
        views: tripPackage.views,
        isFeatured: tripPackage.isFeatured,
        plan,
    };
};
export const TripPackageService = {
    calculatePrice,
    getTripPackage,
    editTripPackage,
    createTripPackage,
    deleteTripPackage,
    searchTripPackages,
};