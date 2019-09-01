import mongoose from 'mongoose';
interface Iteam extends mongoose.Document {
  id: String;
  name: String;
  code: String;
  logo: String;
  country: String;
  founded: Date;
  stadiumName: String;
  stadiumAddress: String;
  city: String;
  stadiumCapacity: Number;
}
export default Iteam;
