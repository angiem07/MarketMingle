const db = require("./connection");
const { User, Product, Order } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Order", "orders");
  await cleanDB("Product", "products");
  await cleanDB("User", "users");
  //create order for testing
  const order1 = new Order({
    user: User.id,
    products: [Product.id],
  });
  //create product for test
  // const product1 = new Product({
  //   name: "Test Product",
  //   description: "This is a test product.",
  //   price: 9.99,
  // });
  const product2 = new Product({
    name: "testproduct2",
    description: "this is a test product number two.",
    order: order1._id,
    price: 4.0,
  });
  console.log(product2);

  // creates users for testing
  await User.create({
    name: "John Doe",
    username: "John1",
    email: "john@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [product2],
      },
    ],
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
