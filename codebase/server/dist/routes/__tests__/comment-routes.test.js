describe(`POST /`, () => {
    it.todo("should return an OK with saved comment when given valid data");
    describe("exceptions", () => {
        it.todo("should return a BAD_REQUEST when given invalid data");
        it.todo("should return a UNAUTHORIZED error when user is unauthorized");
    });
});
describe(`GET /:commentId`, () => {
    it.todo("should return an OK with comment when given valid id");
    describe("exceptions", () => {
        it.todo("should return a NOT FOUND when comment does not exist");
    });
});
describe(`PUT /:commentId`, () => {
    it.todo("should return an OK edited when given valid id and data");
    describe("exceptions", () => {
        it.todo("should return a BAD_REQUEST when given invalid data or id");
        it.todo("should return a UNAUTHORIZED error when user is unauthorized");
        it.todo("should return a NOT_FOUND  when comment does not exist");
    });
});
describe(`DELETE /:commentId`, () => {
    it.todo("should return OK when given valid id");
    describe("exceptions", () => {
        it.todo("should return an UNAUTHORIZED when user is unauthorized");
        it.todo("should return a NO_CONTENT when comment does not exist");
    });
});
describe(`POST /:commentId/:reactionType`, () => {
    it.todo("should return OK when given validId and reactionType");
    describe("exceptions", () => {
        it.todo("should return a BAD_REQUEST when given invalid id and reactionType");
        it.todo("should return an UNAUTHORIZED when user is unauthorized");
        it.todo("should return a NO_CONTENT when comment does not exist");
    });
});
describe(`DELETE /:commentId/:reactionType`, () => {
    it.todo("should return NO_CONTENT when given validId and reactionType");
    describe("exceptions", () => {
        it.todo("should return a BAD_REQUEST when given invalid id and reactionType");
        it.todo("should return an UNAUTHORIZED when user is unauthorized");
        it.todo("should return a NO_CONTENT when comment does not exist");
    });
});
export {};
