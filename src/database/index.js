const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('quotes.db'), { fileMustExist: true });
  
const run = (sql, params) => {
	return db.prepare(sql).run(params);
};

const runQueryWithoutParams = (sql) => {
	return db.prepare(sql).all();
};

const queryWithParams = (sql, params) => {
	return db.prepare(sql).all(params);
};

module.exports = {
	runQueryWithoutParams,
	queryWithParams,
	run,
};