const express = require('express');
const quotesRouter = require('./quotes');

const app = express();
const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
	res.json({ message: 'OK' });
});
  
app.use('/quotes', quotesRouter);

app.listen(port, () => {
	console.log(`Quotes Service Listening at http://localhost:${port}`);
});