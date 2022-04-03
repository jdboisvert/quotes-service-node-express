const db = require('../database');

const getAll = () => {
	const quotes = db.runQueryWithoutParams(`SELECT * FROM quote`);
  
	return quotes;
};

const create = (quoteObj) => {
	const { quote, author } = quoteObj;
	const result = db.run('INSERT INTO quote (quote, author) VALUES (@quote, @author)', { quote, author });
	
	let message = 'Error in creating quote';
	if (result.changes) {
	  message = 'Quote created successfully';
	}
  
	return { message };
};

module.exports = {
	getAll,
	create,
};