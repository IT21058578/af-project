import { Role } from "../constants/constants.js";

export type TRoleValue = TEnumValue<typeof Role>;

export type TEnumKey<T> = keyof T;
export type TEnumValue<T> = T[keyof T];
