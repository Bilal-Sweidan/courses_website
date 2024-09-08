const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: String,
    userName: String,
    password: String,
    email: {
        type: String,
        uppercase: true
    },
    photo: String,
    courses: mongoose.Schema.Types.ObjectId,
    payments: Number,
    mark: Number,
})

module.exports = mongoose.model('students',studentSchema)