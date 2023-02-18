const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    comment_date: {
        type: Date,
        required: true
    },
    comment_likes: {
        type: Number,
        required: true
    },
    comment_photo: {
        type: String,
        required: true
    }
})