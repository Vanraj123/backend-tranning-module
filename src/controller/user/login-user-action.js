module.exports = function ({
  loginUser,
}) {
  return async (req, res) => {
    const logger = req.log;
    console.log("📌 Login controller hit");

    try {
      const { user } = await loginUser({
        username: req.body.username,
        password: req.body.password,
        logger,
      });

      console.log("📌 User fetched:", user);

      if (user==null || user?.user==null) {
       return res.send({
          success: false,
          message: "Invalid cradential",
        });
      }

      req.session.user = {
        id: user.user.id,
        username: user.user.username,
        is_admin: user.user.is_admin,
      };

      console.log("✔ Session saved:", req.session.user);

      return res.json({
        success: true,
        message: "Login Successful",
      });
    } catch (err) {
      // logger?.error("🔥 Login failed:", err);
      return res.send({
          success: false,
          message: "Invalid cradential",
        });
    }
  };
};
