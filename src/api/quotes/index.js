const express = require('express');
const router = express.Router();
const quotes = require('../../models/quotes');
const { logger } = require("../../logger");
const { quoteValidationRules, quoteUpdateValidationRules, validate } = require('./validators.js');

router.get('/:id?', (req, res, next) => {
	try {
		const id = req.query.id;

		if (!id){
			quotes.getAll()
				.then((allQuotes) => res.status(200).json(allQuotes));
		}

		res.status(200).json(quotes.get(id)[0]);

	} catch(err) {
		logger.error(`Error while getting quote(s) ` + err.message);
		res.status(409).json({ message: "Unable to get the quote(s)." });
	}
});

router.post('/', quoteValidationRules(), validate, (req, res) => {
	const quote = req.body;

	try {
		res.status(201).json(quotes.create(quote));
	} catch(err) {
		logger.error(`Error while adding a quote`, err.message);
		res.status(409).json({ message: "Conflict adding quote." });
	}
});

router.put('/:id?', quoteUpdateValidationRules(), validate, (req, res) => {
	try {
		const id = req.query.id;
		if (!id){
			res.status(400).json({ message: "You must provide an id as a query param." });
		}

		const { quote, author } = req.body;
		
		if (!quote && !author){
			res.status(400).json({ message: "You must provide at least one value to update." });
		}

		res.status(200).json(quotes.update({ id, quote, author }));
	} catch(err) {
		logger.error(`Error while updating a quote`, err.message);
		res.status(409).json({ message: "Conflict updating quote." });
	}
});

router.delete('/:id?', (req, res) => {
	const id = req.query.id;

	if (!id){
		res.status(400).json({ message: "You must provide an id as a query param." });
	}

	res.status(200).json(quotes.deleteQuote(id));
});

module.exports = router;