const { date } = require("joi");

module.exports = function ({
  createErrorResponse,
  createSuccessResponse,
  deletePermissionmodule,
}) {
  return async (req, res) => {
    const logger = req.log;

    if (req.session.user.is_admin)
      try {
        // console.log("Con");

        const { permissionmodule } = await deletePermissionmodule({
          userid: req.session.user.id,
          module_code: req.body.module_code,
          logger,
        });

        // res.cookie("session_id", sessionId, {
        //     httpOnly: true,
        //     secure: false,
        //     domain: process.env.DOMAIN,
        // });

        createSuccessResponse(201, permissionmodule, res);
      } catch (err) {
        logger.error(err);
        logger.error("Error in registerUserController");
        createErrorResponse(err, res);
      }
  };
};
