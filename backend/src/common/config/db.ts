import mongoose from "mongoose";
import { env } from "./env.js";

const dbConnect = async (): Promise<void> => {
    try {
       
        const connectionInstance: mongoose.Mongoose = await mongoose.connect(env.MONGODB_URI );

        console.log("MonogDB connected")
        console.log("HOST:", connectionInstance.connection.host)
    } catch (error) {
        console.error("Error While Connecting to DATABASE!", error)
        process.exit(1)
    }
};

export default dbConnect;

