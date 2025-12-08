const { date } = require("joi");

module.exports = function ({
  createErrorResponse,
  createSuccessResponse,
  addPermissionmodule,
}) {
  return async (req, res) => {
    const logger = req.log;
    // console.log("HHHHHHH");
    // console.log(req.session.user.is_admin);

    try {
      // console.log("Con");

      const { permissionmodule } = await addPermissionmodule({
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
