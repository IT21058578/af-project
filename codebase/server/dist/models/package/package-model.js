import { Schema, model } from "mongoose";
export const tripPackageSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdById: { type: String, required: true },
    lastUpdatedById: String,
    totalDistance: { type: Number, required: true },
    price: {
        perPerson: Number,
        transport: {
            group: Number,
            van: Number,
            car: Number,
        },
        lodging: {
            threeStar: Number,
            fourStar: Number,
            fiveStar: Number,
        },
        perPersonFood: Number,
    },
    discount: {
        type: { type: String, enum: ["FLAT", "PERCENT"] },
        value: Number,
    },
    plan: [
        {
            locationId: { type: String, required: true },
            activities: { type: [String], default: [] },
        },
    ],
    limitedDateRange: {
        startDate: Date,
        endDate: Date,
    },
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
}, { timestamps: true });
export const TripPackage = model("TripPackage", tripPackageSchema);
