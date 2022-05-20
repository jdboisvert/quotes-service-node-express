const sqlite3 = require('sqlite3');
const fs = require("fs");
const path = require("path");
const { logger } = require('../logger');

const db = new sqlite3.Database('../../quotes.db',
	sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
	(error) => {
		if (error){
			return logger.error("Unable to read / create database due to " + error);
		}
		// Was able to connect ensure table is set up 
		logger.info("Connected to the in-memory SQLite database successfully.");
	}
);

const setUpTable = () => {
	const createTableSQL = fs.readFileSync(path.join(__dirname + "/create-quotes-table.sql")).toString();	
	db.run(createTableSQL);
};
  
const run = (sql, params) => {
	setUpTable();
	return db.run(sql, params);
};

const all = () => {
	setUpTable();
	return new Promise((resolve, reject) => {   
		db.all(`SELECT * FROM quote`,(err, result) => {
			  if (err) {
				logger.error("Unable to get all quotes " + err);
				reject(err);
			  } else {
				resolve(result);
			  }
		});
	});
};

const runQueryWithoutParams = (sql) => {
	setUpTable();
	return db.all(sql);
};

const queryWithParams = (sql, params) => {
	setUpTable();
	return db.get(sql, params);
};

module.exports = {
	all,
	runQueryWithoutParams,
	queryWithParams,
	run,
};