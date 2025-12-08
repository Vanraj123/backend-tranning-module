module.exports = function ({
  createErrorResponse,
  createSuccessResponse,
  harddeleteUser,
}) {
  return async (req, res) => {
    // const logger = req.log;

    try {
         // logged-in user id (actor)

      const result = await harddeleteUser();

      createSuccessResponse(200, result, res);
    } catch (err) {
      // logger.error(err);
      // logger.error("Error in harddeleteUserAction");
      createErrorResponse(err, res);
    }
  };
};
