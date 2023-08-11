import mongoose from 'mongoose';

export const connectDB = async (url) => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(url);
    console.log("Database Connected")
}
