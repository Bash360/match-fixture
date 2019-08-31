import mongoose from 'mongoose';
require('dotenv').config();

export async function connectToDB() {
  await mongoose
    .connect(process.env.MONGO_DEV, {
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
export async function disconnectDB() {
  await mongoose.connection.db.dropDatabase();
  mongoose.connection.close();
  console.log('connection closed');
}
