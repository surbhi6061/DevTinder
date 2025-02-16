import mongoose from 'mongoose';

// Connect to MongoDB
export const connectDB=async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/nodejs')
}
