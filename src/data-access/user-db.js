const TABLE_NAME = "Users";
const bcrypt = require("bcrypt"); // npm install bcrypt


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

  async function getUserById({ id, logger }) {
    try {
      const query = `
        SELECT id, username, address1, address2, phone_number, is_deleted, deleted_by, deleted_at, is_admin, "createdAt", "updatedAt"
        FROM "${TABLE_NAME}" 
        WHERE id = $1 AND deleted_at IS NULL;
      `;
      const result = await cockroachDb.query(query, [id]);
      return { user: result.rows[0] || null };
    } catch (err) {
      logger?.error("Error fetching user by id:", err);
      throw new UnknownError("Failed to fetch user");
    }
  }

  async function getUserByUsername({ username, logger }) {
    try {
      const query = `
        SELECT id, username, address1, address2, phone_number, is_deleted, deleted_by, deleted_at, is_admin, "createdAt", "updatedAt"
        FROM "${TABLE_NAME}" 
        WHERE username = $1;
      `;
      const result = await cockroachDb.query(query, [username]);
      return { user: result.rows[0] || null };
    } catch (err) {
      logger?.error("Error fetching user by username:", err);
      throw new UnknownError("Failed to fetch user");
    }
  }

  async function createUser({
    username,
    password,
    address1,
    address2,
    phone_number,
    is_admin = false,
    logger
  }) {
    try {
      console.log("DB");
      const hashedPassword = await bcrypt.hash(password, 10); // hash the password
      const createdAt = new Date();
      const updatedAt = new Date();
      const is_deleted = false;
      const deleted_at = null;
      const deleted_by = null;

      const query = `
        INSERT INTO "${TABLE_NAME}" (
          username, password, address1, address2, phone_number,
          is_deleted, deleted_by, deleted_at, is_admin,
          "createdAt", "updatedAt"
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING id, username, address1, address2, phone_number, is_deleted, deleted_by, deleted_at, is_admin, "createdAt", "updatedAt";
      `;
      const values = [
        username || null,
        hashedPassword, // store hashed password
        address1 || null,
        address2 || null,
        phone_number || null,
        is_deleted,
        deleted_by,
        deleted_at,
        is_admin,
        createdAt,
        updatedAt
      ];

      const result = await cockroachDb.query(query, values);
      return { user: result.rows[0] };
    } catch (err) {
      logger?.error("Error creating user:", err);
      throw new UnknownError(err);
    }
  }

  async function logintoUser({ username, password }) {

    try {
      console.log("1")
      const query = `
        SELECT id, username, password, address1, address2, phone_number, is_deleted, deleted_by, deleted_at, is_admin, "createdAt", "updatedAt"
        FROM "${TABLE_NAME}" 
        WHERE username = $1 AND is_deleted = 'false';
      `;
      console.log("2")
      const result = await cockroachDb.query(query, [username]);
      const user = result.rows[0];
      console.log("3",user)
      if (!user) return { user: null };
      console.log("JJ");

      const passwordMatch = await bcrypt.compare(password, user.password); 
      console.log("yh");
// compare hashed password
      if (!passwordMatch) {
      // Invalid password
      return { user: null };
    }
console.log("JJ");
      // Remove password from returned user object
      delete user.password;
      return { user };
    } catch (err) {
      logger?.error("Error logging in user:", err);
      throw new UnknownError(err);
    }
  }

  async function updateuserPassword({ id, newpassword, logger }) {
    try {
      const hashedPassword = await bcrypt.hash(newpassword, 10); // hash new password
      const query = `
        UPDATE "${TABLE_NAME}" 
        SET password = $1, "updatedAt" = NOW() 
        WHERE id = $2
        RETURNING id;
      `;
      const result = await cockroachDb.query(query, [hashedPassword, id]);
      if (!result.rows[0]) throw new NotFoundError("User not found");
      return { message: "Password updated successfully" };
    } catch (err) {
      logger?.error("Error updating password:", err);
      throw new UnknownError(err);
    }
  }

  async function updateuserProfile({
  userid,
  username,
  address1,
  address2,
  phone_number,
  is_deleted = false,
  deleted_by = null,
  logger
}) {
  try {
    let deleted_at = null;
    const query = `
      UPDATE "${TABLE_NAME}"
      SET 
        username = $1,
        address1 = $2,
        address2 = $3,
        phone_number = $4,
        is_deleted = $5,
        deleted_by = $6,
        deleted_at = $7,
        "updatedAt" = NOW()
      WHERE id = $8
      RETURNING id, username, address1, address2, phone_number, is_deleted, deleted_by, deleted_at, is_admin, "createdAt", "updatedAt";
    `;

    const values = [
      username,
      address1,
      address2,
      phone_number,
      is_deleted,    // boolean
      deleted_by, 
      deleted_at, // number OR null
      userid         // user id to update
    ];

    const result = await cockroachDb.query(query, values);
    if (!result.rows[0]) throw new NotFoundError("User not found");

    return { user: result.rows[0] };
  } catch (err) {
    logger?.error("Error updating user profile:", err);
    throw new UnknownError(err);
  }
}


  async function softDeleteUser({ userid, id, logger }) {
    try {
      const query = `
        UPDATE "${TABLE_NAME}"
        SET is_deleted = true,
            deleted_by = $1,
            deleted_at = NOW(),
            "updatedAt" = NOW()
        WHERE id = $2
        RETURNING id;
      `;
      const result = await cockroachDb.query(query, [userid, id]);
      if (!result.rows[0]) throw new NotFoundError("User not found");
      return { message: "User soft deleted successfully" };
    } catch (err) {
      logger?.error("Error soft deleting user:", err);
      throw new UnknownError(err);
    }
  }

  async function hardDeleteUser() {
    try {
      const query = `
        DELETE FROM "${TABLE_NAME}"
        WHERE is_deleted = 'true'
        RETURNING id;
      `;
      const result = await cockroachDb.query(query);
      // logger?.info(`${result.rowCount} soft-deleted users removed permanently.`);
      return { message: "Soft deleted users permanently removed" };
    } catch (err) {
      logger?.error("Error hard deleting users:", err);
      throw new UnknownError(err);
    }
  }
};
