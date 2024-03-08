const db = require("./connection");
const { User } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("User", "users");
  // creates users for testing
  await User.create({
    name: "John",
    email: "john@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    name: "Cristina",
    email: "cristina@testmail.com",
    password: "password12345",
  });
});

console.log("users seeded");

process.exit();
