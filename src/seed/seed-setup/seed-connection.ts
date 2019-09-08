const mongoose = require('mongoose');
require('dotenv').config();
let connection: string = `${process.env.MONGO_PROD}`;

async function connectToDB() {
  await mongoose
    .connect(connection, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('connection successful'))
    .catch((err: object) => {
      console.error(err);
      process.exit(1);
    });
}
async function disconnectFromDB() {
  mongoose.connection.close();
  console.log('connection closed');
}
export { connectToDB, disconnectFromDB };
