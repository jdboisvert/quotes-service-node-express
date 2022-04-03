const express = require('express');
const router = express.Router();
const quotes = require('../../models/quotes');
const { quoteValidationRules, validate } = require('./validators.js');

// router.get('/', function(req, res, next) {
//   try {
//     res.json(quotes.getMultiple(req.query.page));
//   } catch(err) {
//     console.error(`Error while getting quotes `, err.message);
//     next(err);
//   }
// });

router.post('/', quoteValidationRules(), validate, (req, res) => {
	try {
		res.json(quotes.create(req.body));
	} catch(err) {
		console.error(`Error while adding a quote`, err.message);
	}
});

module.exports = router;