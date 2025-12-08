"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("UserPermissions", [
      {
        user_id: 1,
        module_code: "REPORT_MGMT", // PermissionModules.id = 1
        can_create: true,
        can_update: true,
        can_delete: false,
        can_view: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        module_code: "PRODUCT_MGMT", // PermissionModules.id = 2
        can_create: false,
        can_update: false,
        can_delete: false,
        can_view: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        module_code: "USER_MGMT", // PermissionModules.id = 1
        can_create: false,
        can_update: false,
        can_delete: false,
        can_view: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        module_code: "ORDER_MGMT", // PermissionModules.id = 3
        can_create: true,
        can_update: true,
        can_delete: true,
        can_view: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("UserPermissions", null, {});
  },
};
