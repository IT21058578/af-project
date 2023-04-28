import * as jose from "jose";
import fs from "fs/promises";

import initializeLogger from "../utils/logger.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");
const algorithm = "RS256";
const jwtIssuer = "af-project-csse-we-07";

let accessTokenPrivateKey;
let accessTokenPublicKey;
let refreshTokenPrivateKey;
let refreshTokenPublicKey;

const loadKeys = async () => {
	try {
		log.info("Loading keys...");
		accessTokenPrivateKey = await jose.importPKCS8(
			await fs.readFile("./src/assets/keys/access_private_key.pem", {
				encoding: "utf-8",
			}),
			algorithm
		);

		accessTokenPublicKey = await jose.importSPKI(
			await fs.readFile("./src/assets/keys/access_public_key.pem", {
				encoding: "utf-8",
			}),
			algorithm
		);

		refreshTokenPrivateKey = await jose.importPKCS8(
			await fs.readFile("./src/assets/keys/refresh_private_key.pem", {
				encoding: "utf-8",
			}),
			algorithm
		);

		refreshTokenPublicKey = await jose.importSPKI(
			await fs.readFile("./src/assets/keys/refresh_public_key.pem", {
				encoding: "utf-8",
			}),
			algorithm
		);
	} catch (error) {
		log.error("Failed to load keys");
		throw error;
	}
	log.info("Succesfully loaded all keys.");
};

loadKeys();

const decodeAccessToken = async (accessToken) => {
	try {
		log.info("Attempting to decode access token...");
		const verifyResult = await jose.jwtVerify(
			accessToken,
			accessTokenPublicKey
		);
		log.info("Successfully decoded access token");
		return verifyResult;
	} catch (error) {
		log.error(`Failed to decode access token ${error}`);
		throw error;
	}
};

const decodeRefreshToken = async (refreshToken) => {
	try {
		log.info("Attempting to decode refresh token...");
		const verifyResult = await jose.jwtVerify(
			refreshToken,
			refreshTokenPublicKey
		);
		log.info("Successfully decoded refresh token");
		return verifyResult;
	} catch (error) {
		log.error(`Failed to decode refresh token ${error}`);
		throw error;
	}
};

const generateAccessToken = async (id, roles) => {
	try {
		log.info("Attempting to generate access token...");
		const accessToken = await new jose.SignJWT({ id, roles })
			.setProtectedHeader({ alg: algorithm })
			.setIssuedAt()
			.setIssuer(jwtIssuer)
			.setAudience(id)
			.setExpirationTime("2h")
			.secret(accessTokenPrivateKey);
		log.info("Succesfully generated access token");
		return accessToken;
	} catch (error) {
		log.error(`Failed to generate access token ${error}`);
		throw error;
	}
};

const generateRefreshToken = async (id) => {
	try {
		log.info("Attempting to generate refresh token...");
		const refreshToken = await new jose.SignJWT({ id, roles })
			.setProtectedHeader({ alg: algorithm })
			.setIssuedAt()
			.setIssuer(jwtIssuer)
			.setAudience(id)
			.setExpirationTime("7d")
			.secret(refreshTokenPrivateKey);
		log.info("Succesfully generated refresh token");
		return refreshToken;
	} catch (error) {
		log.error(`Failed to generate refressh token ${error}`);
		throw error;
	}
};

export const TokenService = {
	decodeAccessToken,
	decodeRefreshToken,
	generateAccessToken,
	generateRefreshToken,
};
