const mongoose = require('mongoose')

const coursesSchema = new mongoose.Schema({
    courseName: String,
    category: String,
    courseHour: Number,
    price: String,
    description: String,

    students: Array,
    instructor: String,

    language: String,
    providerOrginization: String,
    courseImg: String,
    providerLogo: String,
    videos: Array,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    courseContent:[[[]]],
    rate: [Number]
})

module.exports = mongoose.model('courses', coursesSchema)

// adding courses requirment :
// 1-  weeks
// 2- main title for every weeks
// 3- every title have secondary title
// 4- every secondary title have videos
// 5- course file (pdf,word,ppt,axcel,etc....)

// 6- every main title have:
//     - descrition
//     - what we will learn in this course
//     -[completed , not completed]
//     -

// every video have :
//     - description
//     - files
//     - 
