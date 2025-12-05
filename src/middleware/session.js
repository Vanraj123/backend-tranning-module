const session = require("express-session");
const Redis = require("redis");
let RedisStore = require("connect-redis").default;

// Redis v4 client
const redisClient = Redis.createClient({ url: "redis://localhost:6379" });

redisClient.on("error", (err) => console.error("Redis Error:", err));
redisClient.connect(); // only for Redis v4+

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: "MY_SESSION_SECRET",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  },
});
