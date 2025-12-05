const express = require('express');
const config = require("./config");
const app = express();
const helmet = require("helmet");

// session middleware
const sessionMiddleware = require("./middleware/session");
app.use(sessionMiddleware);

const cors = require("cors");
const { randomUUID } = require("node:crypto");
const pino = require("pino");
const loggerMiddleware = require("pino-http");
const logger = pino.pino();
const bodyParser = require("body-parser");

// security
app.use(helmet());

// parsers
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser(config.cookie.secret));  

// cors setup
app.use(cors(config.cors));

// logger
app.use(
  loggerMiddleware({
    logger: pino(),
    genReqId: function (req, res) {
      const existingID = req.id ?? req.headers["x-request-id"];
      if (existingID) return existingID;
      const id = randomUUID();
      res.setHeader("X-Request-Id", id);
      return id;
    },
    useLevel: "info",
  }),
);

// routes
const router = require("./routes");

// cron job for auto delete user (every 5 min)
const deleteUserJob = require("./cronjob/job");
deleteUserJob();   // start job

// json parser
app.use(express.json());

// base route
app.use('/app', router);

module.exports = app;
