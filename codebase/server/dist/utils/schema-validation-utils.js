export const checkReactionType = {
    reactionType: {
        isIn: { options: [["likes", "dislikes"]] },
        errorMessage: "reactionType must be 'likes' or 'dislikes'",
        in: ["params"],
    },
};
export const checkCommentId = {
    commentId: {
        isMongoId: true,
        errorMessage: "commentId must be an ObjectId",
        in: ["params"],
    },
};
export const checkPostId = {
    postId: {
        isMongoId: true,
        errorMessage: "postId must be an ObjectId",
        in: ["params"],
    },
};
export const checkLocationId = {
    locationId: {
        isMongoId: true,
        errorMessage: "locationId must be an ObjectId",
        in: ["params"],
    },
};
export const checkTripPackageId = {
    tripPackageId: {
        isMongoId: true,
        errorMessage: "tripPackageId must be an ObjectId",
        in: ["params"],
    },
};
export const checkUserId = {
    userId: {
        isMongoId: true,
        errorMessage: "userId must be an ObjectId",
        in: ["params"],
    },
};
export const checkUserFields = (optional, location = "body") => {
    return {
        firstName: {
            optional,
            isString: true,
            errorMessage: "firstName must be a String",
            in: location,
        },
        lastName: {
            optional,
            isString: true,
            errorMessage: "lastName must be a String",
            in: location,
        },
        mobile: {
            optional,
            isString: true,
            errorMessage: "mobile must be a String",
            in: location,
        },
        email: {
            optional,
            isEmail: true,
            errorMessage: "email must be an Email",
            in: location,
        },
        dateOfBirth: {
            optional,
            isDate: true,
            errorMessage: "dateOfBirth must be a Date",
            in: location,
        },
        isAuthorized: {
            optional,
            isBoolean: true,
            errorMessage: "isAuthorized must be a Boolean",
            in: location,
        },
        isSubscribed: {
            optional,
            isBoolean: true,
            errorMessage: "isSubscribed must be a Boolean",
            in: location,
        },
    };
};
export const checkPostFields = (optional, location = "body") => {
    return {
        title: {
            optional,
            isString: true,
            errorMessage: "title must be a String",
            in: location,
        },
        text: {
            optional,
            isString: true,
            errorMessage: "text must be a String",
            in: location,
        },
        imageData: {
            optional,
            isString: true,
            errorMessage: "imageData must be a String",
            in: location,
        },
        tags: {
            optional,
            isArray: true,
            errorMessage: "tags must be an Array",
            in: location,
        },
        "tags.*": {
            isString: true,
            errorMessage: "tags can only contain strings",
            in: location,
        },
    };
};
export const checkCommentFields = (optional, onlyEditableFields, location = "body") => {
    return {
        ...(!onlyEditableFields && {
            parentCommentId: {
                optional: true,
                isMongoId: true,
                errorMessage: "parentCommentId must be a String",
                in: location,
            },
            isOriginalPoster: {
                isBoolean: true,
                errorMessage: "isOriginalPoster must be a boolean",
                optional,
                in: location,
            },
        }),
        text: {
            isString: true,
            errorMessage: "text must be a String",
            optional,
            in: location,
        },
    };
};
export const checkLocationFields = (optional, location = "body") => {
    return {
        name: {
            isString: true,
            errorMessage: "name must be a String",
            optional,
            in: location,
        },
        imageUrl: {
            isURL: true,
            errorMessage: "imageUrl must be a URL",
            optional,
            in: location,
        },
        "address.addressLine1": {
            isString: true,
            errorMessage: "addressLine1 must be a String",
            optional,
            in: location,
        },
        "address.addressLine2": {
            isString: true,
            errorMessage: "addressLine2 must be a String",
            optional,
            in: location,
        },
        city: {
            isString: true,
            errorMessage: "city must be a String",
            optional,
            in: location,
        },
        province: {
            isString: true,
            errorMessage: "province must be a String",
            optional,
            in: location,
        },
    };
};
export const checkTripPackageFields = (optional, location = "body") => {
    return {
        name: {
            optional,
            isString: true,
            errorMessage: "name must be a String",
            in: location,
        },
        totalDistance: {
            optional,
            isNumeric: true,
            errorMessage: "totalDistance must be a Number",
            in: location,
        },
        "price.perPerson": {
            optional,
            isNumeric: true,
            errorMessage: "perPerson must be a Number",
            in: location,
        },
        "price.perPersonFood": {
            optional,
            isNumeric: true,
            errorMessage: "perPersonFood must be a Number",
            in: location,
        },
        "price.transport.group": {
            optional,
            isNumeric: true,
            errorMessage: "group must be a Number",
            in: location,
        },
        "price.transport.van": {
            optional,
            isNumeric: true,
            errorMessage: "van must be a Number",
            in: location,
        },
        "price.transport.car": {
            optional,
            isNumeric: true,
            errorMessage: "car must be a Number",
            in: location,
        },
        "price.lodging.threeStar": {
            optional,
            isNumeric: true,
            errorMessage: "threeStar must be a Number",
            in: location,
        },
        "price.lodging.fourStar": {
            optional,
            isNumeric: true,
            errorMessage: "fourStar must be a Number",
            in: location,
        },
        "price.lodging.fiveStar": {
            optional,
            isNumeric: true,
            errorMessage: "fiveStar must be a Number",
            in: location,
        },
        "discount.value": {
            optional,
            isNumeric: true,
            errorMessage: "value must be a Number",
            in: location,
        },
        "discount.type": {
            optional,
            isIn: { options: ["FLAT", "PERCENT"] },
            errorMessage: "type must be either be 'FLAT' or 'PERCENT'",
            in: location,
        },
        "price.*.locationId": {
            optional,
            isMongoId: true,
            errorMessage: "locationId must be an ObjectId",
            in: location,
        },
        "price.*.activities.*": {
            optional,
            isString: true,
            errorMessage: "Each value in activites must be a String",
            in: location,
        },
        "limitedDateRange.startDate": {
            optional: true,
            isDate: true,
            errorMessage: "startDate must be a Date",
            in: location,
        },
        "limitedDateRange.endDate": {
            optional: true,
            isDate: true,
            errorMessage: "endDate must be a Date",
            in: location,
        },
    };
};
export const checkPageOptions = {
    pageNum: {
        isInt: true,
        errorMessage: "pageNum must be an Integer",
        optional: true,
        toInt: true,
        in: ["query"],
    },
    pageSize: {
        isInt: true,
        errorMessage: "pageSize must be an Integer",
        optional: true,
        toInt: true,
        in: ["query"],
    },
    sortField: {
        isString: true,
        errorMessage: "sortField must be a String",
        optional: true,
        in: ["query"],
    },
    sortDir: {
        isIn: {
            options: ["asc", "desc"],
        },
        errorMessage: "sortDir must be either 'asc' or 'desc'",
        optional: true,
        in: ["query"],
    },
};
export const checkUserDetails = {
    "user-id": {
        isMongoId: true,
        errorMessage: "user-id header must be an ObjectId and present",
        in: ["headers"],
    },
    "user-roles": {
        isArray: true,
        errorMessage: "user-roles header must have an array of valid roles",
        in: ["headers"],
    },
};
