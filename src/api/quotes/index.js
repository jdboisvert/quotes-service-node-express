const express = require('express');
const router = express.Router();
const quotes = require('../../models/quotes');
const { quoteValidationRules, quoteUpdateValidationRules, validate } = require('./validators.js');

router.get('/:id', (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id){
			res.json(quotes.getAll());
		}

		// TODO Get by ID

	} catch(err) {
		console.error(`Error while getting quotes `, err.message);
		next(err);
	}
});

router.post('/', quoteValidationRules(), validate, (req, res) => {
	try {
		const quote = req.body;
		res.json(quotes.create(quote));
	} catch(err) {
		console.error(`Error while adding a quote`, err.message);
	}
});

router.put('/:id', quoteUpdateValidationRules(), validate, (req, res) => {
	try {
		const { id } = req.params;
		const { quote, author } = req.body;
		if (!quote && !author){
			res.json("You must provide at least one value to update.");
		}

		res.json(quotes.update({ id, quote, author }));
	} catch(err) {
		console.error(`Error while adding a quote`, err.message);
	}
});

// router.delete('/:id', (req, res, next) => {
// 	// TODO Make delete
// });

module.exports = router;