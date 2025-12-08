module.exports = function ({
  createErrorResponse,
  createSuccessResponse,
  updatePassword,
}) {
  return async (req, res) => {
    const logger = req.log; // may be undefined if logger middleware not called

    try {
      if (!req.session || !req.session.user) {
        return res.json({
          success: false,
          message: "You are logged out",
        });
      }

      const { user } = await updatePassword({
        id: req.session.user.id,
        newpassword: req.body.newpassword,
        logger,
      });

      return createSuccessResponse(200, user, res);
    } catch (err) {
      // use optional chaining to avoid crash
      logger?.error(err);
      logger?.error("Error in updatePasswordAction");

      return createErrorResponse(err, res);
    }
  };
};
