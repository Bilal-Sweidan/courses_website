const mongoose = require('mongoose')

const adminnSchema = new mongoose.Schema({
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    fullName: String,
    userName: String,
    phoneNumber: String,
    address: String,
    email:{
        type: String,
        uppercase: true
    },
    photo: String,
    inbox: String,
})


module.exports = mongoose.model('admin',adminnSchema)