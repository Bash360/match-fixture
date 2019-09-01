import mongoose from 'mongoose';
interface Iteam extends mongoose.Document {
  id: string;
  name: string;
  headCoach: string;
  teamCode: string;
  logo: string;
  country: string;
  founded: Date;
  stadiumName: string;
  stadiumAddress: string;
  city: string;
  stadiumCapacity: number;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean | null;
  teamDetails: any;
}
export default Iteam;
