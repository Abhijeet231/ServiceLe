import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("MonogDB Connected!")
    } catch (error) {
        console.log("MongoDB Connection Error:", error);
    }
}

export default connectDB;
