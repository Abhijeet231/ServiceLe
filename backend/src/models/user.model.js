import mongoose, {Schema} from "mongoose";

const userSchema = new Schema ({
    name: {
        type: String,
        required: [true, "Name is required!"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters long!"],
        maxlength: [50, "Name must be less than 50 characters long!"],
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
            minlength: [6, "Password must be at least 6 characters long!"],
            maxlength: [50, "Password must be less than 50 characters long!"],
    },
    role: {
        type: String,
        enum: ["customer", "provider", "admin"],
        required: true,
    },
    city: {
        type: String,
        required: [true, "City is required!"],
        minlength: [2, "City must be at least 2 characters long!"],
        maxlength: [50, "City must be less than 50 characters long!"],
    }

}, {timestamps: true});

// INDEXING
userSchema.index({email:1})

//MODEL
const User = mongoose.model("User", userSchema);

export default User;
