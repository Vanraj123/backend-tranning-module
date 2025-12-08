const { date } = require("joi");

module.exports = function ({
  createErrorResponse,
  createSuccessResponse,
  addPermission,
}) {
  return async (req, res) => {
    const logger = req.log;

    try {
      // console.log("Con");

      const { permission } = await addPermission({
        userid: req.session.user.id,
        user_id: req.body.user_id,
        module_code: req.body.module_code,
        can_create: req.body.can_create,
        can_update: req.body.can_update,
        can_delete: req.body.can_delete,
        can_view: req.body.can_view,
        logger,
      });

      // res.cookie("session_id", sessionId, {
      //     httpOnly: true,
      //     secure: false,
      //     domain: process.env.DOMAIN,
      // });

      createSuccessResponse(201, permission, res);
    } catch (err) {
      logger.error(err);
      logger.error("Error in registerUserController");
      createErrorResponse(err, res);
    }
  };
};
