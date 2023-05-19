import { Location } from "../models/location-model.js";
import { User } from "../models/user-model.js";
import { LocationTransformer } from "./location-transformer.js";
import { UserTransformer } from "./user-transformer.js";
const buildTripPackageVO = async (tripPackage) => {
    if (tripPackage === null)
        return {};
    // Start fetching locations
    const locationVOPromises = [];
    for (const { locationId } of tripPackage.plan) {
        // We are pushing a promise of a called getter function.
        // This function could easily be elsewhere, this is for conciseness
        locationVOPromises.push((async () => {
            const location = await Location.findById(locationId);
            return LocationTransformer.buildLocationVO(location);
        })());
    }
    // Start fetching and wait for both users
    const users = await Promise.all([
        User.findById(tripPackage.createdById),
        User.findById(tripPackage.lastUpdatedById),
    ]);
    const [createdBy, lastUpdatedBy] = users.map((user) => UserTransformer.buildUserVO(user));
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
        imageURLs: tripPackage.imageURLs,
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
export const PackageTransformer = { buildTripPackageVO };
