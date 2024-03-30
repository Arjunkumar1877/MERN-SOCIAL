import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    picturePath: {
        type: String,
       default: ""
    },
    friends: {
        type: Array,
        default: []
    },
    locationg: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,

}, { timestamps: true})

export const User = mongoose.model("user", userSchema) 
