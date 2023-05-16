import mongoose from "mongoose";
import initializeLogger from "./logger.js";
import { ELodging, ETransport, MONGODB_URI } from "../constants/constants.js";
import { faker } from "@faker-js/faker";
import { User } from "../models/user-model.js";
import { Post } from "../models/post/post-model.js";
import { Comment } from "../models/comment-model.js";
import { Location } from "../models/location-model.js";
import { TripPackage } from "../models/package/package-model.js";
import { Booking } from "../models/booking-model.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const selectRandom = <T>(arr: T[], exclude?: T[]) => {
	const res = faker.helpers.arrayElements(arr);
	return res;
};

const selectRandomOne = <T>(arr: T[]) => {
	const result = faker.helpers.arrayElement(arr);
	return result;
};

mongoose.connect(MONGODB_URI || "", { dbName: "af-project" }).then(async () => {
	log.info("Established connection");

	log.info("Saving new users");
	const savedUserIds: string[] = [];
	for (const _i of Array(10)) {
		const user = new User({
			roles: ["USER"],
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: faker.datatype.string(),
			isAuthorized: true,
			isSubscribed: faker.datatype.boolean(),
			lastLoggedAt: faker.date.recent(),
			mobile: faker.phone.number(),
			authorizationToken: faker.datatype.uuid(),
			resetToken: faker.datatype.uuid(),
			dateOfBirth: faker.date.birthdate(),
		});
		const savedUser = await user.save();
		savedUserIds.push(savedUser.id);
	}

	log.info("Saving new posts");
	const savedPostIds: string[] = [];
	for (const _i of Array(30)) {
		const likes = selectRandom(savedUserIds);
		const dislikes = selectRandom(savedUserIds);
		const post = new Post({
			likes,
			dislikes,
			createdById: selectRandomOne(savedUserIds),
			lastUpdatedById: selectRandomOne(savedUserIds),
			tags: faker.datatype.array(),
			text: faker.lorem.paragraphs(),
			image: faker.internet.url(),
			title: faker.lorem.sentence(),
			userId: selectRandomOne(savedUserIds),
		});
		const savedPost = await post.save();
		savedPostIds.push(savedPost.id);
	}

	log.info("Saving new comments");
	const savedCommentIds: string[] = [];
	for (const _i of Array(60)) {
		console.log(savedUserIds);
		const likes = selectRandom(savedUserIds);
		const dislikes = selectRandom(savedUserIds);
		const createdById = selectRandomOne(savedUserIds);
		const postId = selectRandomOne(savedPostIds);
		const parentCommentId = selectRandomOne(savedCommentIds);
		const comment = new Comment({
			likes,
			dislikes,
			text: faker.lorem.paragraphs(),
			createdById,
			postId,
			parentCommentId,
		});
		const savedComment = await comment.save();
		savedCommentIds.push(savedComment.id);
	}

	log.info("Saving new locations");
	const savedLocationIds: string[] = [];
	for (const _i of Array(20)) {
		const createdById = selectRandomOne(savedUserIds);
		const lastUpdatedById = selectRandomOne(savedUserIds);
		const location = new Location({
			address: {
				addressLine1: `${faker.address.buildingNumber()}, ${faker.address.streetAddress()}`,
				addressLine2: faker.address.county(),
				city: faker.address.cityName(),
				province: faker.address.cardinalDirection(),
			},
			createdById,
			lastUpdatedById,
			name: faker.lorem.words(),
			imageData: faker.image.city(),
		});
		const savedLocation = await location.save();
		savedLocationIds.push(savedLocation.id);
	}

	log.info("Saving new trip packages");
	const savedPackageIds: string[] = [];
	for (const _i of Array(10)) {
		const plan = selectRandom(savedLocationIds).map((id) => ({
			locationId: id,
			activities: faker.datatype.array(),
		}));
		const createdById = selectRandomOne(savedUserIds);
		const lastUpdatedById = selectRandomOne(savedUserIds);
		const tripPackage = new TripPackage({
			views: faker.datatype.number({ min: 0 }),
			createdById,
			lastUpdatedById,
			name: faker.lorem.words(),
			description: faker.lorem.paragraph(),
			price: {
				perPerson: faker.datatype.number({ min: 0 }),
				lodging: {
					fiveStar: faker.datatype.number({ min: 1000 }),
					fourStar: faker.datatype.number({ min: 100, max: 1000 }),
					threeStar: faker.datatype.number({ min: 0, max: 100 }),
				},
				transport: {
					car: faker.datatype.number({ min: 100, max: 1000 }),
					group: faker.datatype.number({ min: 0, max: 100 }),
					van: faker.datatype.number({ min: 1000, max: 10000 }),
				},
				perPersonFood: faker.datatype.number({ min: 0, max: 100 }),
			},
			totalDistance: faker.datatype.number({ min: 0 }),
			plan,
			...(faker.datatype.boolean()
				? {
						limitedDateRange: {
							startDate: faker.date.recent(),
							endDate: faker.date.soon(),
						},
				  }
				: {}),
			...(faker.datatype.boolean()
				? {
						discount: {
							type: "FLAT",
							value: faker.datatype.number({ min: 0 }),
						},
				  }
				: {}),
		});
		const savedTripPackage = await tripPackage.save();
		savedPackageIds.push(savedTripPackage.id);
	}

	log.info("Saving new bookings");
	const savedBookingIds: string[] = [];
	for (const _i of Array(30)) {
		const createdById = selectRandomOne(savedUserIds);
		const booking = new Booking({
			createdById,
			paymentMadeAt: faker.date.recent(),
			stripePaymentId: faker.datatype.uuid(),
			stripeSessionId: faker.datatype.uuid(),
			package: {
				id: selectRandomOne(savedPackageIds),
				lodging: selectRandomOne(Object.values(ELodging)),
				transport: selectRandomOne(Object.values(ETransport)),
				perFood: faker.datatype.boolean(),
			},
		});
		const savedBooking = await booking.save();
		savedBookingIds.push(savedBooking.id);
	}

	log.info("Finished all tasks");
	await mongoose.disconnect();
});
