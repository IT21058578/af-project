export const buildErrorMessage = (
	type: string,
	cause: string,
	location: string,
	errors: any
) => ({
	type,
	cause,
	location,
	errors,
});