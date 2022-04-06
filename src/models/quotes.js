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

const update = (quoteObj) => {
	const { id, quote, author } = quoteObj;

	let result = null;
	if (quote && author){
		result = db.run(
			'UPDATE quote SET (quote, author) VALUES (@quote, @author) WHERE id = @id', { quote, author, id }
		);
	}

	if(quote && !author){
		result = db.run('UPDATE quote SET (quote) VALUES (@quote) WHERE id = @id', { quote, id });
	}

	if (author && !quote){
		result = db.run('UPDATE quote SET (author) VALUES (@author) WHERE id = @id', { author, id });
	}
	
	let message = 'Error in creating quote';
	if (result.changes) {
	  message = 'Quote created successfully';
	}
  
	return { message };
};



module.exports = {
	create,
	update,
	getAll,
};