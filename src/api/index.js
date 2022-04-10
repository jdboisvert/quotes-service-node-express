const express = require('express');
const bp = require('body-parser');
const quotesRouter = require('./quotes');
const logger = require("../logger");

const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
	res.json({ message: 'OK' });
});
  
app.use('/quotes', quotesRouter);

app.listen(port, () => {
	logger.log(`Quotes Service Listening at http://localhost:${port}`);
});