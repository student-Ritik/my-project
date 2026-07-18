const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected! ✅');
  } catch (error) {
    console.error(`MongoDB Error: ${error.message} ❌`);
  }
};

module.exports = connectDB;