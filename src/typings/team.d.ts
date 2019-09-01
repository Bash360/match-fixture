import mongoose from 'mongoose';
interface Iteam extends mongoose.Document {
  id: string;
  name: string;
  code: string;
  logo: string;
  country: string;
  founded: Date;
  stadiumName: string;
  stadiumAddress: string;
  city: string;
  stadiumCapacity: number;
}
export default Iteam;
