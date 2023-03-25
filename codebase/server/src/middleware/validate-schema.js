import { checkSchema, validationResult } from "express-validator";

const validateSchema = (schema, defaultLocations) => {
	const first = checkSchema(schema, defaultLocations);
	checkSchema({ "": {} });
	const second = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors);
		} else {
			next();
		}
	};
	return [first, second];
};

export default validateSchema;
