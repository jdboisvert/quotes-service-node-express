const db = require('../database');

const getAll = () => {
	const data = db.query(`SELECT * FROM quote`);
  
	return {
		...data,
	};
};

module.exports = {
	getAll,
};