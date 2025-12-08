module.exports = function ({
  createErrorResponse,
  createSuccessResponse,
  updatePermission,
}) {
  return async (req, res) => {
    const logger = req.log;

    try {
      // console.log("Con");

      const permission = await updatePermission({
        userid: req.session.user.id,
        user_id: req.params.userId,
        module_code: req.body.module_code,
        can_create: req.body.can_create,
        can_update: req.body.can_update,
        can_delete: req.body.can_delete,
        can_view: req.body.can_view,
        logger,
      });

      createSuccessResponse(201, permission, res);
    } catch (err) {
      logger.error(err);
      logger.error("Error in updatePermissionController");
      createErrorResponse(err, res);
    }
  };
};
