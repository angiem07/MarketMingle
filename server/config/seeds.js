const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'Fruits' },
    { name: 'Vegetables' },
  ]);

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: 'Bananas',
      image: 'bananas.jpeg',
      category: categories[0]._id,
      price: 2.99,
      quantity: 500
    },
    {
      name: 'Broccoli',
      image: 'broccoli.jpeg',
      category: categories[0]._id,
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Carrots',
      category: categories[1]._id,
      image: 'carrots.jpeg',
      price: 3.99,
      quantity: 20
    },
    {
      name: 'Kiwi',
      category: categories[0]._id,
      image: 'kiwi.jpeg',
      price: 3.99,
      quantity: 50
    },
    {
      name: 'Mango',
      category: categories[0]._id,
      image: 'mango.jpeg',
      price: 2.99,
      quantity: 100
    },
    {
      name: 'Raspberries',
      category: categories[0]._id,
      image: 'raspberries,jpeg',
      price: 5.99,
      quantity: 30
    },
    {
      name: 'Strawberries',
      category: categories[0]._id,
      image: 'strawberries.jpeg',
      price: 4.99,
      quantity: 30
    },
    {
      name: 'Tomato',
      category: categories[1]._id,
      image: 'tomato.jpeg',
      price: 1.99,
      quantity: 100
    },
  ]);

  console.log('products seeded');

  await User.create({
    name: "John Doe",
    email: "john@testmail.com",
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    name: "Cristina Smith",
    email: "cristina@testmail.com",
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});


  