module.exports = function () {
  return async (req, res) => {
    console.log("📌 Logout controller hit");

    try {
      // If no active session
      if (!req.session || !req.session.user) {
        return res.json({
          success: true,
          message: "User already logged out",
        });
      }

    //   const username = req.session.user.username;

      // Destroy session stored in Redis
      req.session.destroy((err) => {
        if (err) {
          console.log("❌ Error destroying session:", err);
          return res.json({
            success: false,
            message: "Logout failed",
          });
        }

        // Clear session cookie in browser
        res.clearCookie("connect.sid");

        // console.log("✔ Session cleared for:", username);

        return res.json({
          success: true,
          message: "Logout Successful",
        });
      });
    } catch (err) {
      console.log("🔥 Logout error:", err);
      return res.json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};
