module.exports = function ({
  createErrorResponse,
  createSuccessResponse,
  softdeleteUser,
}) {
  return async (req, res) => {
    const logger = req.log;

    // console.log("HII");

    try {
      const id = req.params.userId;
      // const userid = req.body.user;   // <-- FIXED

      const result = await softdeleteUser({
        userid: req.session.user.id,
        id,
        logger,
      });

      createSuccessResponse(200, result, res);
    } catch (err) {
      logger.error(err);
      logger.error("Error in getUserByIdAction");
      createErrorResponse(err, res);
    }
  };
};
