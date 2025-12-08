"use strict";

const { Model } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserPermissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      // take reference of below references syntax

      // user_id: {
      //   type: Sequelize.INTEGER,
      //   references: { model: 'Users', key: 'id' },
      //   onDelete: 'CASCADE'
      // },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
      },
      module_code: {
        type: Sequelize.STRING,
      },
      can_create: {
        type: Sequelize.BOOLEAN,
      },
      can_update: {
        type: Sequelize.BOOLEAN,
      },
      can_delete: {
        type: Sequelize.BOOLEAN,
      },
      can_view: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserPermissions");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
