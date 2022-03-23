const { body, validationResult } = require('express-validator');
const { HTTP } = require('../../constants');

const quoteValidationRules = () => {
	return [
		body('quote').isString().withMessage('Only letters and digits are allowed.'),
		body('author_name').isAlpha().withMessage('Only letters are allowed.'),
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
	validate,
};