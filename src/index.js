const express = require("express");
const Redis = require("redis");

const app = require("./app.js");

// Connect to Redis (service name "redis")
// const client = Redis.createClient({ url: "redis://redis:6379" });

// client.on("error", (err) => console.error("Redis Error:", err));

// async function connectRedis() {
//   await client.connect();
//   console.log("Redis connected!");
// }
// connectRedis();

// API route
// app.get("/", async (req, res) => {
//   let count = await client.get("counter");
//   count = count ? Number(count) + 1 : 1;
//   await client.set("counter", count);
//   res.send(`Page visited ${count} times`);
// });

app.listen(3000, () => console.log("Server running on port 3000"));
