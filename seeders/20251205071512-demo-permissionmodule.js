"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("PermissionModules", [
      {
        module_code: "USER_MGMT",
        module_description: "User Management Module",
        is_active: true,
        created_by: 1, // can be a user id
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        module_code: "ORDER_MGMT",
        module_description: "Order Management Module",
        is_active: true,
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        module_code: "PRODUCT_MGMT",
        module_description: "Product Management Module",
        is_active: true,
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        module_code: "REPORT_MGMT",
        module_description: "Reports Module",
        is_active: true,
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("PermissionModules", null, {});
  },
};
