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
      name: 'Broccoli.jpeg',
      image: 'broccoli.jpeg',
      category: categories[0]._id,
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Carrots',
      category: categories[1]._id,
      image: 'toilet-paper.jpg',
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
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'wooden-spoons.jpg',
      price: 2.99,
      quantity: 100
    },
    {
      name: 'Raspberries',
      category: categories[0]._id,
      image: 'mango.jpeg',
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
    username: "John1",
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
    username: "Cristina23",
    email: "cristina@testmail.com",
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});


  