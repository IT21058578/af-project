describe(`POST /`, () => {
    it.todo("should return an OK with saved post when given valid data");
    describe("exceptions", () => {
        it.todo("should return a BAD_REQUEST when given invalid data");
        it.todo("should return a UNAUTHORIZED error when user is unauthorized");
    });
});
describe(`GET /:postId`, () => {
    it.todo("should return an OK with post when given valid id");
    describe("exceptions", () => {
        it.todo("should return a BAD_REQUEST when given invalid data");
        it.todo("should return a NOT FOUND when post does not exist");
    });
});
describe(`PUT /:postId`, () => {
    it.todo("should return an OK edited when given valid id and data");
    describe("exceptions", () => {
        it.todo("should return a BAD_REQUEST when given invalid data or id");
        it.todo("should return a UNAUTHORIZED error when user is unauthorized");
        it.todo("should return a NOT_FOUND  when post does not exist");
    });
});
describe(`DELETE /:postId`, () => {
    it.todo("should return OK when given valid id");
    describe("exceptions", () => {
        it.todo("should return a BAD_REQUEST when given invalid data");
        it.todo("should return an UNAUTHORIZED when user is unauthorized");
        it.todo("should return a NO_CONTENT when post does not exist");
    });
});
describe(`POST /:postId/:reactionType`, () => {
    it.todo("should return OK when given validId and reactionType");
    describe("exceptions", () => {
        it.todo("should return a BAD_REQUEST when given invalid id and reactionType");
        it.todo("should return an UNAUTHORIZED when user is unauthorized");
        it.todo("should return a NO_CONTENT when post does not exist");
    });
});
describe(`DELETE /:postId/:reactionType`, () => {
    it.todo("should return NO_CONTENT when given validId and reactionType");
    describe("exceptions", () => {
        it.todo("should return a BAD_REQUEST when given invalid id and reactionType");
        it.todo("should return an UNAUTHORIZED when user is unauthorized");
        it.todo("should return a NO_CONTENT when post does not exist");
    });
});
describe(`GET /search`, () => {
    describe("should return OK with appropriate data", () => {
        it.todo("when no search query");
        it.todo("with search query");
    });
    describe("exceptions", () => {
        it.todo("should return a BAD_REQUEST when given invalid search query");
    });
});
export {};
