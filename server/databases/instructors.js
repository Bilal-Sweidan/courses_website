const mongoose = require('mongoose')

const instructorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    gender: String,
    phoneNumber: String,
    password: String,
    email:{
        type: String,
        lowercases: true
    },
    department: String,
    birthDay: Date,
    adress: String,
    about: String,
    rate: Number,
    teacherImg: String,
})

module.exports = mongoose.model('instructors',instructorSchema)