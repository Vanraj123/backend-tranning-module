
const TABLE_NAME = "UserPermissions";

module.exports = function ({ cockroachDb, UnknownError, NotFoundError, buildQueryFromFilters, buildMultiSort }) {
    return {
       addPermission,
       updatePermission
    };

    async function addPermission({
      userid,
      user_id,
      module_code,
      can_create,
      can_update,
      can_delete,
      can_view,
      logger
}) {
    console.log("HHHHHHH");
    console.log(new Date());
  try {
    // Convert Joi date object to valid Date
    createdAt =  new Date();
    updatedAt =  new Date();

    let query = `
      SELECT * FROM "Users" 
      WHERE user_id = $1;
    `;

    let result = await cockroachDb.query(query, [userid]);

    const userPermission = result.rows[0]; // extract 1st row
    console.log(userPermission);

    if (userPermission && userPermission.is_admin === true) {
    const query = `
      INSERT INTO "${TABLE_NAME}" (
      user_id,
      module_code,
      can_create,
      can_update,
      can_delete,
      can_view,
      "createdAt",
      "updatedAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
      updatedAt
    ];

    const result = await cockroachDb.query(query, values);
    return result.rows[0];
  }
  } catch (err) {
    logger.error(err.message);
    logger.error("Error creating user:");
    throw new UnknownError(err);
  }
}

async function updatePermission({
  userid,
      user_id,
      module_code,
      can_create,
      can_update,
      can_delete,
      can_view,
      logger
}) {
    console.log("HHHHHHH");
    console.log(new Date());
  try {
    // Convert Joi date object to valid Date
    createdAt =  new Date();
    updatedAt =  new Date();
     let query = `
      SELECT * FROM "Users" 
      WHERE user_id = $1;
    `;

    let result = await cockroachDb.query(query, [userid]);

    const userPermission = result.rows[0]; // extract 1st row
    console.log(userPermission);

    if (userPermission && userPermission.is_admin === true) {
    let query;

    query = `
      DELETE FROM "${TABLE_NAME}" WHERE USENAME = $1;
    `;

    let values = [
      user_id
    ];

    let result;
    result = await cockroachDb.query(query, values);

    query = `
      INSERT INTO "${TABLE_NAME}" (
        user_id,
      module_code,
      can_create,
      can_update,
      can_delete,
      can_view,
      "createdAt",
      "updatedAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

     values = [
      user_id,
      module_code,
      can_create,
      can_update,
      can_delete,
      can_view,
      createdAt,
      updatedAt
    ];

    result = await cockroachDb.query(query, values);

    return result;
  }

  } catch (err) {
    logger.error(err.message);
    logger.error("Error creating user:");
    throw new UnknownError(err);
  }
}


};
    

