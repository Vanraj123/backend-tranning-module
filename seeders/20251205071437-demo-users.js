"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin_user",
          password: "admin123",
          address1: "Street 1",
          address2: "Area ABC",
          phone_number: "9876543210",
          created_at: new Date(),
          is_deleted: "false",
          deleted_by: null,
          deleted_at: null,
          is_admin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "normal_user",
          password: "user123",
          address1: "Lane 45",
          address2: "XYZ Colony",
          phone_number: "9123456780",
          created_at: new Date(),
          is_deleted: "false",
          deleted_by: null,
          deleted_at: null,
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
