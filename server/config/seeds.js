const db = require("./connection");
const { User, Product, Order } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("User", "users");
  // creates users for testing
  await User.create({
    name: "John Doe",
    username: "John1",
    email: "john@testmail.com",
    password: "password12345",
    // orders: [
    //   {
    //     products: [products[0]._id, products[0]._id, products[1]._id],
    //   },
    // ],
  });

  await User.create({
    name: "Cristina Smith",
    username: "Cristina23",
    email: "cristina@testmail.com",
    password: "password12345",
  });
  console.log("user seeded");
  process.exit();
});
