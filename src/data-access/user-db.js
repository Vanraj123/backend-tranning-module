
const TABLE_NAME = "Users";

module.exports = function ({ cockroachDb, UnknownError, NotFoundError, buildQueryFromFilters, buildMultiSort }) {
    return {
        getUserById,
        getUserByUsername,
        createUser,
        logintoUser,
        updateuserPassword,
        updateuserProfile,
        softDeleteUser,
        hardDeleteUser
    };

    async function getUserById({ id, userId, logger }) {
  try {
      let query = `
        SELECT * FROM "${TABLE_NAME}" 
        WHERE id = $1 AND deleted_at IS NULL;
      `;

      const userDetail = await cockroachDb.query(query, [id]);
      return userDetail.rows[0];

  } catch (err) {
    console.log(err);
    logger.error(err.message);
    logger.error("Error fetching user by id:");
    throw new UnknownError("Failed to fetch user");
  }
}


    async function getUserByUsername({ username, logger }) {
  try {
    const query = `
      SELECT * FROM "${TABLE_NAME}"
      WHERE username = $1 ;
    `;

    const result = await cockroachDb.query(query, [username]);

    // If no rows found, return null
    if (!result.rows || result.rows.length === 0) {
      logger?.info(`User not found: ${username}`);
      return null;
    }

    // Return first matching user
    return result.rows[0];

  } catch (error) {
    logger?.error("Error fetching user:", error);
    throw error; // rethrow so calling function knows what happened
  }
}


  async function createUser({
    userid,
  username,
  password,
  address1,
  address2,
  phone_number,
  created_at,
  is_deleted = null,
  deleted_by = null,
  deleted_at,
  is_admin = false,
  createdAt,
  updatedAt,
  logger
}) {
    console.log("HHHHHHH");
    console.log(new Date());
    
  try {
    // Convert Joi date object to valid Date
    created_at =  new Date();
    createdAt =  new Date();
    updatedAt =  new Date();
    deleted_at =  null;

    const query = `
      INSERT INTO "${TABLE_NAME}" (
        username, 
        password, 
        address1, 
        address2, 
        phone_number,
        created_at,
        is_deleted,
        deleted_by,
        deleted_at,
        is_admin,
        "createdAt",
        "updatedAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;

    const values = [
      username || null,
      password,
      address1 || null,
      address2 || null,
      phone_number || null,
      created_at,
      is_deleted,
      deleted_by,
      deleted_at,
      is_admin,
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

async function logintoUser({
  username,
  password,
  logger
}) {
    console.log("HHHHHHH");
    // console.log(new Date());
  try {
    // Convert Joi date object to valid Date
    const query = `
      SELECT * FROM "${TABLE_NAME}" WHERE 
      username = $1 AND password = $2 ;
    `;

    const values = [
      username,
      password
    ];

    const result = await cockroachDb.query(query, values);
    return result.rows[0];

  } catch (err) {
    logger.error(err.message);
    logger.error("Error creating user:");
    throw new UnknownError(err);
  }
}

async function updateuserPassword({
  username,
  password,
  newpassword,
  logger
}) {
    console.log("HHHHHHH");
    // console.log(new Date());
  try {
    // Convert Joi date object to valid Date
    const query = `
      UPDATE "${TABLE_NAME}" SET PASSWORD = $1 WHERE USERNAME = $2 AND PASSWORD = $3;
    `;

    const values = [
      newpassword,
      username,
      password
    ];

    const result = await cockroachDb.query(query, values);
    return result.rows[0];

  } catch (err) {
    logger.error(err.message);
    logger.error("Error creating user:");
    throw new UnknownError(err);
  }
}

 async function updateuserProfile({
  userid,
  username,
  password,
  address1,
  address2,
  phone_number,
  created_at,
  is_deleted = null,
  deleted_by = null,
  deleted_at,
  is_admin = false,
  createdAt,
  updatedAt,
  logger
}) {
    console.log("HHHHHHH");
    console.log(new Date());
  try {
    
    // Convert Joi date object to valid Date
    created_at =  new Date();
    createdAt =  new Date();
    updatedAt =  new Date();
    deleted_at =  null;

  } catch (err) {
    logger.error(err.message);
    logger.error("Error creating user:");
    throw new UnknownError(err);
  }
}
async function softDeleteUser({ userid,id, logger }) {
        try {       
            const query = `
                UPDATE  "${TABLE_NAME}" SET is_deleted = $1
                WHERE id = $2;
            `;
            
            is_deleted = "true";
            const values = [
              is_deleted,
              id
            ];
            const result = await cockroachDb.query(query, values);
            
            return "User softly Deleted Succesfully";
        } catch (err) {
            console.log(err);
            if (err instanceof NotFoundError) throw err;
            logger.error(err.message);
            logger.error("Error fetching user by id:")
            throw new UnknownError("Failed to fetch user");
        }
    }

async function hardDeleteUser() {
  try {
    const query = `
      DELETE FROM "Users"
      WHERE is_deleted = $1;
    `;
    
    await cockroachDb.query(query,[true]);
    console.log("Soft deleted users removed permanently!");

  } catch (error) {
    console.error("Error in hard delete cron:", error.message);
  }
}

}