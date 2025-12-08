const TABLE_NAME = "Items";

module.exports = function ({ cockroachDb }) {
  return {
    addItem,
    getItem,
    updateItem
  };

 async function addItem({ item_code, description, item_pictures, length, breadth, height, created_by, logger }) {
  try {
    logger.info("Adding new item version");

    // Check item_code already exists
    const existingItem = await cockroachDb.query(
      `SELECT item_code FROM "${TABLE_NAME}" WHERE item_code = $1 LIMIT 1`,
      [item_code]
    );

    if (existingItem.rows.length > 0) {
      logger.warn("Item already exists");
      return { status: "error", message: "Item code already exists" };
    }

    // Convert single image to array
    if (!Array.isArray(item_pictures)) item_pictures = [item_pictures];

    // Extract filename from file object
    item_pictures = item_pictures.map(pic =>
      typeof pic === "string" ? pic : pic.filename || pic.key
    );

    // Version default = 1 when first time created
    let version = 1;

    const query = `
      INSERT INTO "${TABLE_NAME}" (
        item_code, description, item_pictures, length, breadth, height, version, created_by
      )
      VALUES ($1, $2, $3::jsonb, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      item_code,
      description,
      JSON.stringify(item_pictures),
      length,
      breadth,
      height,
      version,
      created_by,
    ];

    const result = await cockroachDb.query(query, values);
    return { status: "success", data: result.rows[0] };

  } catch (err) {
    logger.error("Error in ItemDb.addItem:", err.message);
    throw err;
  }
}

async function updateItem({ item_code, description, item_pictures, length, breadth, height, created_by, logger }) {
  try {
    logger.info("Updating item by creating new version");

    // Convert single to array
    if (!Array.isArray(item_pictures)) item_pictures = [item_pictures];

    // Extract filename from file object
    item_pictures = item_pictures.map(pic =>
      typeof pic === "string" ? pic : pic.filename || pic.key
    );

    // Check existing max version
    const versionResult = await cockroachDb.query(
      `SELECT MAX(version) AS max_version FROM "${TABLE_NAME}" WHERE item_code = $1`,
      [item_code]
    );

    // If item_code does not exist → throw error
    if (!versionResult.rows[0].max_version) {
      logger.warn("Item code not found to update");
      return { status: "error", message: "Item code does not exist" };
    }

    // New version number
    const newVersion = Number(versionResult.rows[0].max_version) + 1;

    // Insert new version record (old stays same)
    const query = `
      INSERT INTO "${TABLE_NAME}" (
        item_code, description, item_pictures, length, breadth, height, version, created_by
      )
      VALUES ($1, $2, $3::jsonb, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      item_code,
      description,
      JSON.stringify(item_pictures),
      length,
      breadth,
      height,
      newVersion,
      created_by
    ];

    const result = await cockroachDb.query(query, values);

    return { status: "success", message: "New version created", data: result.rows[0] };

  } catch (err) {
    logger.error("Error in updateItemWithVersioning:", err.message);
    throw err;
  }
}

  async function getItem({item_code,logger}) {
console.log(item_code);
    try {
      const result = await cockroachDb.query(
        `SELECT * FROM "Items" WHERE item_code = $1 ORDER BY version DESC LIMIT 1`,
        [item_code]
      );
      // console.log(result.row[0]);
      if (result.rows.length === 0) {
        return ({ Status: "Error", data: "Item not found" });
      }

      return ({
        data: result.rows[0],
      });

    } catch (err) {
      logger.error(err);
      return ({ Status: "Error", data: err.message });
    }
  }

};
