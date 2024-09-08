const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    name:String,
    description:String,
    img: String,
    createdAt: Date,
    courses:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'courses'    
    }
})

module.exports = mongoose.model('categories',categoriesSchema)