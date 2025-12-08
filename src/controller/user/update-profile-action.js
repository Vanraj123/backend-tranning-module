const { date } = require("joi");

module.exports = function ({
  createErrorResponse,
  createSuccessResponse,
  updateProfile,
}) {
  return async (req, res) => {
    const logger = req.log;

    try {
      // console.log("Con");

      const { user } = await updateProfile({
        userid: req.session.user.id,
        username: req.body.username,
        address1: req.body.address1,
        address2: req.body.address2,
        phone_number: req.body.phone_number,
        created_at: new date(),
        is_deleted: false,
        deleted_by: null,
        deleted_at: null,
        is_admin: false,
        logger,
      });

      // res.cookie("session_id", sessionId, {
      //     httpOnly: true,
      //     secure: false,
      //     domain: process.env.DOMAIN,
      // });

      createSuccessResponse(201, user, res);
    } catch (err) {
      logger.error(err);
      logger.error("Error in registerUserController");
      createErrorResponse(err, res);
    }
  };
};
