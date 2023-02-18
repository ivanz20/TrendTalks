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
        require: true
    },
    shortalks:{
        type: String,
        require: true
    },
    isShortTalkUpload:{
        type: Boolean,
        require: true
    }
});

module.exports = mongoose.model('User', userSchema);