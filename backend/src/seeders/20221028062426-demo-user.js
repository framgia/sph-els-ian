"use strict";
const { generateHash } = require("../utils");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        username: "12",
        password: await generateHash("1234"),
        avatar: "default.jpeg",
        email: "123@gmail.com",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "ian",
        password: await generateHash("1234"),
        avatar: "default.jpeg",
        email: "123@yahoo.com",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "dave",
        password: await generateHash("1234"),
        avatar: "default.jpeg",
        email: "1ab@gmail.com",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "art",
        password: await generateHash("1234"),
        avatar: "default.jpeg",
        email: "1243@gmail.com",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "mark",
        password: await generateHash("1234"),
        avatar: "default.jpeg",
        email: "123@gmail.com",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
