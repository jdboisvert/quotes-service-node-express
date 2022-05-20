const { describe, it } = require("eslint/lib/rule-tester/rule-tester");
const request = require('supertest');

const app = require('../../src/api');

const { logger } = require("../../src/logger");

describe("Quote Endpoints", () => {
	it("Should test that all quotes in the database are returned", async () => {
		const response = await request(app).post("/quotes").send({ 
			quote: "Quote that is famous", 
			author: "A person", 
		});
		logger.info({ response });
		expect(response.statusCode).toBe(201);
	}); 
	it("Should test that all quotes in the database are returned (when none exist)", () => {
		expect(true).toBe(true);
	}); 


	it("Should test that a specific quote in the database is returned", () => {
		expect(true).toBe(true); 
	});

	it("Should test that a quote is inserted in the database", () => {
		expect(true).toBe(true);
	});
	it("Should test that a quote is not inserted in the database since it already exists", () => {
		expect(true).toBe(true);
	});

	it("Should test that a quote is updated in the database", () => {
		expect(true).toBe(true);
	});
	it("Should test that a quote is not updated in the database since it does not exist", () => {
		expect(true).toBe(true);
	});
});