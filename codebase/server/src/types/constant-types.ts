import { Role } from "../constants/constants";

export type TRoleValue = (typeof Role)[keyof typeof Role];
