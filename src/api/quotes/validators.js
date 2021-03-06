const { body, validationResult } = require('express-validator');
const { HTTP } = require('../../constants');

const quoteValidationRules = () => {
	return [
		body('quote').isString().withMessage('Only letters and digits are allowed.'),
		body('author').isString().withMessage('Only letters are allowed.'),
	];
};

const quoteUpdateValidationRules = () => {
	return [
		body('quote').isString().withMessage('Only letters and digits are allowed.').optional({ nullable: true }),
		body('author').isString().withMessage('Only letters are allowed.').optional({ nullable: true }),
	];
};

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const extractedErrors = [];
	errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

	return res.status(HTTP.BAD_REQUEST).json({
		errors: extractedErrors,
	});
};

module.exports = {
	quoteValidationRules,
	quoteUpdateValidationRules,
	validate,
};