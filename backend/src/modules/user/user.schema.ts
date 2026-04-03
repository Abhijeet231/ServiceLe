import bcrypt from "bcryptjs";
import mongoose, { Document, Model } from "mongoose";

// Defining Interface for User 
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "customer" | "provider" | "admin";
    refreshToken?: string;
    avatar?: {
        url?: string;
        public_id?: string;
    };
    isVerified: boolean;
    verificationToken: String;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    address: string;
    location: {
        type: "Point";
        coordinates: [number, number]; // [lng, lat]
    };
    createdAt: Date;
    updatedAt: Date;

    comparePassword(clearTextPassword: string): Promise<boolean>;
}


// Defining DB Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters long!"],
        maxlength: [50, "Name must be less than 50 characters long!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "please use a valid email address"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: [6, "Password must be at least 6 characters long!"],
        select: false
    },
    role: {
        type: String,
        enum: ["customer", "provider", "admin"],
        default: "customer"
    },
    refreshToken: {
        type: String,
        select: false
    },
    avatar: {
        url: { type: String },
        public_id: { type: String }

    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken:{
         type: String,
         select: false,
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpires: {
        type: Date,
        select: false
    },

    // Address fileds
    address: {
        type: String,
        required: true
    },

    // GeoJSON location format
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    }

}, { timestamps: true })


// Location  indexing
userSchema.index({ location: "2dsphere" });

// Password Hasing
userSchema.pre("save", async function (this:IUser) {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
})

// Password Comparision method
userSchema.methods.comparePassword = async function (
    this: IUser,
    clearTextPassword: string): Promise<boolean> {
    return await bcrypt.compare(clearTextPassword, this.password)
}

// Typed Model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
