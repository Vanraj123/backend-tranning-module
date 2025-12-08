const session = require("express-session");
const RedisStore = require("connect-redis").default;
const Redis = require("redis");

// Redis client
const redisClient = Redis.createClient({
  url: "redis://redis:6379", // docker service name (not localhost)
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

(async () => {
  await redisClient.connect();
  console.log("Redis connected for session store!");
})();

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: "MY_SESSION_SECRET", // change to env variable in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true only if HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
});
