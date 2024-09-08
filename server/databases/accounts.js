const mongoose = require('mongoose')

const AccountsSchema = new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    role:{
        type: String,
        lowercase: false
    },
    email:{
        type: String,
        // lowercases: true
    },
    phone: String,
    location:String,
    dataId: {
        type: mongoose.Schema.Types.ObjectId,
    }
})

const adminnSchema = new mongoose.Schema({
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
    role: String
})

const studentSchema = new mongoose.Schema({
    full_name: String,
    username: String,
    phone: String,
    location: String,
    email: String,
    courses: [],
    photo: String,
    job: String,
    role: String
})

const studentCourseSchema = new mongoose.Schema({
    studentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required : true
    },
    courseID : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required : true
    },
    weekStatus: [Boolean],
    videosStatus: Array,
    StudentNotes: Array,
    rate: Number,
    comment: String,
    marke: Number,

})



const Account = mongoose.model('accounts',AccountsSchema) 
const Admin = mongoose.model('admin',adminnSchema)
const Student = mongoose.model('student', studentSchema)
const StudentCourse = mongoose.model('student course',studentCourseSchema)

module.exports = {
    Account,
    Admin,
    Student,
    StudentCourse
}
