
const TABLE_NAME = "PermissionModules";

module.exports = function ({ cockroachDb, UnknownError, NotFoundError, buildQueryFromFilters, buildMultiSort }) {
    return {
       addPermissionmodule,
       updatePermissionmodule,
       deletePermissionmodule
    };

    
     async function addPermissionmodule({module_code,module_description,userid,logger
}) {
    console.log("HHHHHHH");
    console.log(new Date());
  try {

    // Convert Joi date object to valid Date
    createdAt =  new Date();
    updatedAt =  new Date();
    is_active = true;
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

    const values = [
      module_code,
      module_description,
      is_active,
      userid,
      createdAt,
      updatedAt
    ];

    const result = await cockroachDb.query(query, values);
    return result.rows[0];
  

  } catch (err) {
    logger.error(err.message);
    logger.error("Error creating user:");
    throw new UnknownError(err);
  }
}

async function updatePermissionmodule({
      module_code,
      module_description,
      userid,
      logger
}) {
    console.log("HHHHHHH");
    console.log(new Date());
  try {
    
    // Convert Joi date object to valid Date
    createdAt =  new Date();
    updatedAt =  new Date();

    let query;

    query = `
      DELETE FROM "${TABLE_NAME}" WHERE module_code = $1;
    `;

    let values = [
      module_code
    ];

    let result;
    result = await cockroachDb.query(query, values);

    createdAt =  new Date();
    updatedAt =  new Date();
    is_active = true;
    query = `
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

    values = [
      module_code,
      module_description,
      is_active,
      userid,
      createdAt,
      updatedAt
    ];

    result = await cockroachDb.query(query, values);
    return result.rows[0];

  } catch (err) {
    logger.error(err.message);
    logger.error("Error creating user:");
    throw new UnknownError(err);
  }
}

async function deletePermissionmodule({
  userid,
      module_code,
      logger
}) {
    console.log("HHHHHHH");
    console.log(new Date());
  try {
    // Convert Joi date object to valid Date
    let query;

    query = `
      DELETE FROM "${TABLE_NAME}" WHERE module_code = $1;
    `;

    let values = [
      module_code
    ];

    let result;
    result = await cockroachDb.query(query, values);

    return result.rows[0];

  } catch (err) {
    logger.error(err.message);
    logger.error("Error creating user:");
    throw new UnknownError(err);
  }
}
}