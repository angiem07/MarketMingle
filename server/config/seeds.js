const db = require("./connection");
const { User, Product, Order, Category } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Category", "category");
  await cleanDB("Order", "orders");
  await cleanDB("Product", "products");
  await cleanDB("User", "users");
  const categories = await Category.insertMany([{ name: "Fruits" }]);
  //create order for testing
  // const order1 = new Order({
  //   user: User.id,
  //   products: [Product.id],
    
  // });
  //create product for test
  // const product1 = new Product({
  //   name: "Test Product",
  //   description: "This is a test product.",
  //   price: 9.99,
  // });
  const product2 = await Product.create({
    name: "testproduct2",
    description: "this is a test product number two.",
    category: categories[0]._id,
    // order: order1._id,
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
