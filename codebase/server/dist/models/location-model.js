import { Schema, model } from "mongoose";
export const locationSchema = new Schema({
    createdById: { type: String, required: true },
    lastUpdatedById: String,
    name: { type: String, required: true },
    imageData: String,
    address: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        province: String,
    },
}, { timestamps: true });
export const Location = model("Location", locationSchema);
