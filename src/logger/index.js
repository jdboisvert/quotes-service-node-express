const winston = require("winston");

const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	defaultMeta: { service: "user-service" },
	transport: [
		new winston.transport.File({ filename: "error.log", level: "error" }),
		new winston.transport.File({ filename: "combined.log" }),
	],
});

if (process.env.NODE_ENV !== "production") {
	logger.add(new winston.transport.Console({
		format: winston.format.simple(),
	}));
}

module.exports = {
	logger,
};