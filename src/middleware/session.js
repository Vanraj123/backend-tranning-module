const session = require("express-session");
const Redis = require("redis");
let RedisStore = require("connect-redis").default;

const redisClient = Redis.createClient({
  url: `redis://${process.env.REDIS_HOST || "localhost"}:6379`
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

redisClient.connect();

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
