const cron = require("node-cron");
const axios = require("axios");

const API_URL = "http://localhost:4000/app/user/harddeleteuser";

const deleteUserJob = () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      console.log("⏳ Cron job started: Sending request to server...");

      const response = await axios.delete(API_URL);

      console.log("📌 Server Response:", response.data);
    } catch (error) {
      console.error("❌ Error in cron job:", error.message);
    }
  });
};

module.exports = deleteUserJob;
