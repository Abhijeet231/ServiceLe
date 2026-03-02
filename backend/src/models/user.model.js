import mongoose, {Schema} from "mongoose";

const userSchema = new Schema ({
    name: {
        type: String,
        required: [true, "Name is required!"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/ , "please use a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    role: {
        type: String,
        enum: ["customer", "provider", "admin"],
        required: true,
    },
    city: {
        type: String,
        required: [true, "City is required!"]

    }

}, {timestamps: true});

// INDEXING
userSchema.index({email:1})

//MODEL
const User = mongoose.model("User", userSchema);

export default User;
