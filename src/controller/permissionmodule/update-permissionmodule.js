const { date } = require("joi");

module.exports = function ({
  createErrorResponse,
  createSuccessResponse,
  updatePermissionmodule,
}) {
  return async (req, res) => {
    const logger = req.log;

    try {
      // console.log("Con");

      const { permissionmodule } = await updatePermissionmodule({
        module_code: req.body.module_code,
        module_description: req.body.module_description,
        userid: req.session.user.id,
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
