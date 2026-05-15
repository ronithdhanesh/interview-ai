const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"This username is already taken"],
        required:true,
    },

    email:{
        type:String,
        unique:[true,"An account already exists with this username"],
        required:true
    },

    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel;