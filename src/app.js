const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomUUID } = require("node:crypto");
const pino = require("pino");
const loggerMiddleware = require("pino-http");

const sessionMiddleware = require("./middleware/session");
// const sessionMiddleware = require('./middleware/session');
const router = require("./routes");
const deleteUserJob = require("./cronjob/job");

const app = express();

// Security
app.use(helmet());

// Body parsers
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(cors());

// Logger
// app.use(
//   loggerMiddleware({
//     logger: pino(),
//     genReqId: (req, res) => {
//       const existingID = req.id ?? req.headers["x-request-id"];
//       if (existingID) return existingID;
//       const id = randomUUID();
//       res.setHeader("X-Request-Id", id);
//       return id;
//     },
//     useLevel: "info",
//   })
// );

// 🔥 Enable Session (Redis stored)
app.use(sessionMiddleware);

deleteUserJob();
// app.get('/',(req,res)=>
// {
//     res.end("kkkkk");
// })
// Base route
app.use("/app", router);

module.exports = app;
