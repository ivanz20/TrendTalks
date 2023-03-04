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
        required: false
    },
    isShortTalkUpload:{
        type: Boolean,
        required: false
    },
    profile_pic: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);