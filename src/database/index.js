const sqlite = require('better-sqlite3');
const fs = require("fs");
const path = require('path');
const { logger } = require('../logger');

const db = new sqlite.Database(path.resolve('quotes.db'),
	sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE,
	(error) => {
		if (error){
			return logger.error("Unable to read / create database.", error);
		}
		// Was able to connect ensure table is set up 
		logger.info("Connected to the in-memory SQLite database successfully.");
	}
);

const setUpTable = () => {
	const createTableSQL = fs.readFileSync("../../sql/create_quotes_table.sql").toString();	
	db.prepare(createTableSQL).run();
};
  
const run = (sql, params) => {
	setUpTable();
	return db.prepare(sql).run(params);
};

const runQueryWithoutParams = (sql) => {
	setUpTable();
	return db.prepare(sql).all();
};

const queryWithParams = (sql, params) => {
	setUpTable();
	return db.prepare(sql).all(params);
};

module.exports = {
	runQueryWithoutParams,
	queryWithParams,
	run,
};