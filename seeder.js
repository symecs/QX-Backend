const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const bcrypt = require('bcryptjs');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany([
      { name: 'Admin User', email: 'admin@gmail.com', password: await bcrypt.hash('usama12345', 10), isAdmin: true },
      { name: 'John Doe', email: 'john@example.com', password: await bcrypt.hash('123456', 10) }
    ]);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = [
      {
        name: 'Sony WH-1000XM5',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80',
        description: 'Industry leading noise cancellation with two processors control 8 microphones for unprecedented noise cancellation. With Auto NC Optimizer, noise canceling is automatically optimized based on your wearing conditions and environment.',
        brand: 'Sony',
        category: 'Over-Ear',
        price: 398.00,
        countInStock: 10,
        user: adminUser
      },
      {
        name: 'Apple AirPods Max',
        image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=500&q=80',
        description: 'Active Noise Cancellation blocks outside noise, so you can immerse yourself in music. Transparency mode for hearing and interacting with the world around you.',
        brand: 'Apple',
        category: 'Over-Ear',
        price: 549.00,
        countInStock: 5,
        user: adminUser
      },
      {
        name: 'Bose QuietComfort 45',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426fa99f5?auto=format&fit=crop&w=500&q=80',
        description: 'The first-class noise cancellation headphones. QuietComfort 45 headphones are engineered with a perfect balance of quiet, comfort, and sound.',
        brand: 'Bose',
        category: 'Over-Ear',
        price: 329.00,
        countInStock: 15,
        user: adminUser
      },
      {
        name: 'Sennheiser Momentum 4',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80',
        description: 'Maximum audio resolution with Sennheiser Signature Sound. The new MOMENTUM 4 Wireless once again raises the bar – delivering best-in-class sound quality with advanced Adaptive Noise Cancellation.',
        brand: 'Sennheiser',
        category: 'Over-Ear',
        price: 349.95,
        countInStock: 8,
        user: adminUser
      }
    ];

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
