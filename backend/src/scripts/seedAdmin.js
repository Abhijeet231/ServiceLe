import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { DB_NAME } from "../constants.js";

await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

const adminExists = await User.findOne({role:"admin"});

if(adminExists){
    console.log("Admin already exits!")
    process.exit()
}

const hashedPassword = await bcrypt.hash("admin444", 10)

await User.create({
    name: "BigBoss",
    email: "bigboss01@servicele.com",
    password: hashedPassword,
    city: "Bangalore",
    role: "admin"
});

console.log("Admin Created Successfully.");

process.exit();