import mongoose from "mongoose";
import type { string } from "zod";

const dbConnect = async (): Promise<void> => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined!")
        }
        const connectionInstance: mongoose.Mongoose = await mongoose.connect(MONGODB_URI);
        console.log("MonogDB connected")
    } catch (error) {
        console.error("Error While Connecting to DATABASE!", error)
        process.exit(1)
    }
};

export default dbConnect;

