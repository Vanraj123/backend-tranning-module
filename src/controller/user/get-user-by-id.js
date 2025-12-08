module.exports = function ({
  createErrorResponse,
  createSuccessResponse,
  getUserById,
}) {
  return async (req, res) => {
    const logger = req.log;

    // console.log("HII");

    try {
      const id = req.params.userId;

      // console.log("HkkI");

      const result = await getUserById({
        id: id,
        userId: req.session.user.id,
        logger,
      });

      console.log(result);
      if(!result.user.user)
      {
        result.user = "User not found";
      }
      createSuccessResponse(200, result, res);
    } catch (err) {
      logger.error(err);
      logger.error("Error in getUserByIdAction");
      createErrorResponse(err, res);
    }
  };
};
