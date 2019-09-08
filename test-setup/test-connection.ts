import mongoose from 'mongoose';
require('dotenv').config();
let connection = `${process.env.MONGO_TEST}`;

async function connectToDB() {
  await mongoose
    .connect(connection, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('connection successful'))
    .catch(err => {
      console.error(err.message);
      process.exit(1);
    });
}
async function disconnectFromDB() {
  await mongoose.connection.db.dropDatabase();
  mongoose.connection.close();
  console.log('connection closed');
}
export { connectToDB, disconnectFromDB };
