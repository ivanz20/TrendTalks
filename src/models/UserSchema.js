const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    birthday:{
        type: Date,
        required: true
    },
    shortalks:{
        type: String,
        required: true
    },
    isShortTalkUpload:{
        type: Boolean,
        required: true
    },
    profile_pic: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);