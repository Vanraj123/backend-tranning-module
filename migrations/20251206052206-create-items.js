"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      item_code: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      item_pictures: {
        type: Sequelize.JSON,
      },
      length: {
        type: Sequelize.FLOAT,
      },
      breadth: {
        type: Sequelize.FLOAT,
      },
      height: {
        type: Sequelize.FLOAT,
      },
      version: {
        type: Sequelize.INTEGER,
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Items");
  },
};
