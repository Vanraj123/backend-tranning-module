const TABLE_NAME = "PermissionModules";

module.exports = function ({
  cockroachDb,
  UnknownError,
  NotFoundError,
  buildQueryFromFilters,
  buildMultiSort,
}) {
  return {
    addPermissionmodule,
    updatePermissionmodule,
    deletePermissionmodule,
  };

  async function addPermissionmodule({ module_code, module_description, userid, logger }) {
    try {
      const createdAt = new Date();
      const updatedAt = new Date();
      const is_active = true;

      const query = `
        INSERT INTO "${TABLE_NAME}" (
          module_code,
          module_description,
          is_active,
          created_by,
          "createdAt",
          "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;

      const values = [module_code, module_description, is_active, userid, createdAt, updatedAt];
      const result = await cockroachDb.query(query, values);

      return { permissionModule: result.rows[0] };
    } catch (err) {
      logger.error("Error creating permission module:", err);
      throw new UnknownError(err);
    }
  }

  async function updatePermissionmodule({ module_code, module_description, userid, logger }) {
  try {
    const updatedAt = new Date();

    const query = `
      UPDATE "${TABLE_NAME}"
      SET 
      module_description = $1,
      "updatedAt" = $2
      WHERE module_code = $3
      RETURNING *;
    `;

    const values = [module_description, updatedAt, module_code];
    const result = await cockroachDb.query(query, values);

    if (result.rows.length === 0) {
      logger.warn(`Permission module with code ${module_code} not found.`);
      throw new NotFoundError(`Permission module with code ${module_code} not found`);
    }

    return { permissionModule: result.rows[0] };
  } catch (err) {
    logger.error("Error updating permission module:", err);
    throw new UnknownError(err);
  }
}

  async function deletePermissionmodule({ module_code, logger }) {
    try {
      const result = await cockroachDb.query(
        `DELETE FROM "${TABLE_NAME}" WHERE module_code = $1 RETURNING *;`,
        [module_code]
      );

      if (result.rows.length === 0) {
        throw new NotFoundError("Permission module not found");
      }

      return { deletedPermissionModule: result.rows[0] };
    } catch (err) {
      logger.error("Error deleting permission module:", err);
      throw new UnknownError(err);
    }
  }
};
