const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema({
    categoria:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Category', CategorySchema)