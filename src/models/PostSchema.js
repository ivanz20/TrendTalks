const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    post_content: {
        type: String,
        required: true
    },
    post_date: {
        type: String,
        required: true
    },
    hashs:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        required: true
    },
    comments:{
        type: Number,
        required: true
    },
    photo_post:{
        type: String,
        required: false
    },
    video_post: {
        type: String,
        required: false
    },
    user_profilepic: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', PostSchema);