const mongoose = require('mongoose');
require('dotenv').config();
let connection: string;
if (process.env.MONGO_PROD) {
  connection = process.env.MONGO_PROD;
} else {
  process.exit(1);
}

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
