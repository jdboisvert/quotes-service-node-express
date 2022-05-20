const db = require('../database');
// const { logger } = require('../logger');

const getAll = db.all;

const get = (id) => {
	const quote = db.queryWithParams(`SELECT * FROM quote WHERE id = ?`, [ id ]);
  
	return quote;
};

const create = (quoteObj) => {
	const { quote, author } = quoteObj;
	const result = db.run('INSERT INTO quote (quote, author) VALUES (?, ?)', [ quote, author ]);
	
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
			'UPDATE quote SET quote = ?, author = ? WHERE id = ?', [ quote, author, id ]
		);
	}

	if(quote && !author){
		result = db.run('UPDATE quote SET quote = ? WHERE id = ?', [ quote, id ]);
	}

	if (author && !quote){
		result = db.run('UPDATE quote SET author = ? WHERE id = ?', [ author, id ]);
	}
	
	let message = 'Error in updating quote';
	if (result.changes) {
	  message = 'Quote updated successfully';
	}
  
	return { message };
};

const deleteQuote = (id) => {
	const result = db.run('DELETE FROM quote WHERE id = ?', [ id ]);
	
	let message = 'Error in deleting quote';
	if (result.changes) {
	  message = 'Quote deleted successfully';
	}
  
	return { message };
};



module.exports = {
	create,
	update,
	getAll,
	get,
	deleteQuote,
};