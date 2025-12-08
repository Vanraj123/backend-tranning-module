const TABLE_NAME = "UserPermissions";

module.exports = function ({
  cockroachDb,
  UnknownError,
  NotFoundError,
  buildQueryFromFilters,
  buildMultiSort,
}) {
  return {
    addPermission,
    updatePermission,
  };

  async function addPermission({
    userid,
    user_id,
    module_code,
    can_create,
    can_update,
    can_delete,
    can_view,
    logger,
  }) {
    try {
      const createdAt = new Date();
      const updatedAt = new Date();

      const query = `
        INSERT INTO "${TABLE_NAME}" (
          user_id, module_code, can_create, can_update, can_delete, can_view, "createdAt", "updatedAt"
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `;

      const values = [
        user_id,
        module_code,
        can_create,
        can_update,
        can_delete,
        can_view,
        createdAt,
        updatedAt,
      ];

      const result = await cockroachDb.query(query, values);

      return { permission: result.rows[0] }; // <-- valid return format
    } catch (err) {
      logger.error("Error creating permission:", err);
      throw new UnknownError(err);
    }
  }

  async function updatePermission({
    user_id,
    module_code,
    can_create,
    can_update,
    can_delete,
    can_view,
    logger,
  }) {
    try {
      const query = `
        UPDATE "${TABLE_NAME}"
        SET 
          can_create = $1,
          can_update = $2,
          can_delete = $3,
          can_view = $4,
          "updatedAt" = NOW()
        WHERE module_code = $5
        RETURNING *;
      `;

      const values = [
        can_create,
        can_update,
        can_delete,
        can_view,
        module_code,
      ];

      const result = await cockroachDb.query(query, values);

      if (result.rows.length === 0) {
        logger.warn("Permission update failed — record not found");
        throw new NotFoundError("Permission does not exist for this user and module");
      }

      logger.info("Permission updated successfully");
      return { permission: result.rows[0] }; // <-- valid return format
    } catch (err) {
      logger.error("Error updating permission:", err);
      throw new UnknownError(err);
    }
  }
};
