const mongoose = require("mongoose")

const FollowerSchema = mongoose.Schema({
    seguidor:{
        type: String,
        required: true
    },
    seguido:{
        type: String,
        required: true
    },
    followedsince:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Follow', FollowerSchema)