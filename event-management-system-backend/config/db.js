// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//             useCreateIndex: true
//         });
//         console.log('MongoDB connected');
//     } catch (error) {
//         console.error('Error connecting to MongoDB', error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
