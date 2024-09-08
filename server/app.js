const express = require('express')
const app = express()
app.use(express.json())

// app.enable('trust proxy')
// app.set('trust proxy', 1) // trust first proxy
// cookie-parser middleware
// const cookieParser = require('cookie-parser')
// const cookie = require('cookie')
// app.use(cookieParser())


// middlewares
// const jwt = require('jsonwebtoken')
// core middleware
const cors = require('cors')
app.use(cors({
    origin: [
        'http://localhost:8082',
        'https://localhost:8082'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}))

const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const path = require('node:path')
const bcrypt = require('bcryptjs')
const multer = require('multer')

// session middleware
const session = require('express-session')
const store = new session.MemoryStore()
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: false,
    resave: false,
    // cookie: {
    //     httpOnly: true,
    //     maxAge: 1000 * 60 * 60 * 24,
    // },
}));
// passport middleware
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())
require('./Strategies/local')

// locat storage
let imageName;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/src/assets/imagesUploaded')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
        imageName = Date.now() + path.extname(file.originalname)
    }
})
const upload = multer({ storage })

// mongoose database
const { Account, Admin, Student , StudentCourse } = require('./databases/accounts')
const CoursesData = require('./databases/courses')
const CategoriesData = require('./databases/categories')
const InstructorData = require('./databases/instructors')
mongoose.connect('mongodb://127.0.0.1:27017/CoursesSite')

// Home pages
app.get('/', (req, res) => {
    Account.find()
        .then(data => {
            res.json({ membership: data.length })
        })
})
app.get('/course/:courseName', async (req, res, next) => {
    const courseID = req.query.ID
    const courseName = req.params.courseName
    let courseData = await CoursesData.findOne({ _id: courseID })
    res.json({ "courseData": courseData})
})

// log in and sign up pages
app.post('/login', (req, res) => {
    const newAccountData = req.body
    Account.findOne({ username: newAccountData.newUsername })
        .then((data) => {
            if (data) {
                res.send(false)
            } else {
                // const hash = hashing(newAccountData.newPassword)
                // newAccountData.newPassword = hash
                student(newAccountData)
                res.send(true)
            }
        })
})
app.post('/ForgetPassword', (req, res) => {
    console.log(req.body)
    Account.findOne({ username: req.body.username })
        .then(data => {
            console.log(data)
            if (data) {
                sendMail(data.name, data.email)
                res.json({ stat: true })
            } else {
                res.json({ stat: false })
            }
        })
})
app.post('/validationCode', (req, res) => {
    const { validationCode } = req.body

})

// log in 
// app.post('/signIn', (req, res) => {
//     const loginData = req.body
//     Account.findOne({ username: loginData.username })
//         .then((data) => {
//             if (data) {
//                 const compareHashingPassword = compareHashing(loginData.password, data.password)
//                 if (compareHashingPassword) {
//                     if (data.role === 'Admin') {
//                         Admin.findById(data.dataId)
//                             .then(adminData => {
//                                 req.session.user = adminData
//                                 res.json({ role: data.role })
//                             })
//                     } else if (data.role === 'Student') {
//                         Student.findById(data.dataId)
//                         .then(studentData => {
//                             req.session.studentData = studentData
//                             res.json({ role: data.role })
//                         })
//                     }
//                 } else {
//                     res.sendStatus(401)
//                 }
//             } else {
//                 console.log('wrong in username or password')
//                 res.sendStatus(400)
//             }
//         })
// })

app.post('/signIn', passport.authenticate('local'), (req, res, next) => {
    const { role } = req.user
    console.log(req.user.role)
    res.json({ role: role })
})

// Admin pages
app.get('/Admin', (req, res) => {
    res.json(req.user)
})
app.get('/Admin/dashboard/AllInfo', async (req, res) => {
    const studentsLength = (await Account.find({ role: 'Student' })).length
    const instructorsLength = (await Account.find({ role: 'instructor' })).length
    const coursesLength = await (await CoursesData.find()).length
    res.json({
        studentsLength,
        instructorsLength,
        coursesLength
    })
})
app.get('/Admin/teachers/addTeacher', (req, res) => {
    CategoriesData.find()
        .then(data => {
            res.json(data)
        })
})
app.post('/Admin/teachers/addTeacher', upload.single('file'), (req, res) => {
    const newTeacherData = JSON.parse(req.body.teacherData);
    const userName = `${newTeacherData.firstName}_${newTeacherData.lastName[0]}`
    InstructorData.findOne({ userName: userName })
        .then(data => {
            if (data) {
                res.json({ message: "this instructor is already exist." });
            } else {
                newTeacher(newTeacherData)
                res.json({ message: "inserted successfuly." });
            }
        })
})
app.get('/Admin/departments/addDepartment', (req, res) => {
    CoursesData.find()
        .then(data => {
            res.json(data.courseName)
        })
})
app.post('/Admin/courses/AddCourse', upload.fields([{ name: 'course_image', maxCount: 1 }, { name: 'provider_logo', maxCount: 1 }]), (req, res) => {
    const data = {
        course_image: req.files['course_image'][0].filename,
        provider_logo: req.files['provider_logo'][0].filename,
        course_data: JSON.parse(req.body.new_course_data)
    }
    console.log(JSON.parse(req.body.new_course_data))
    newCourse(data)
    res.json({courseName : data.course_data.name , status : true})
})

app.get('/Admin/courses/CourseContent/:courseName',(req,res) => {
    // console.log(req.params.courseName)
    CoursesData.findOne({ courseName : req.params.courseName})
    .then(data => {
        res.json(data)
    })
})
app.post('/Admin/courses/CourseContent/:courseName',upload.fields([{name : 'media' , maxCount : 10}]), async (req,res) => {
    let content = []
    req.body.content.forEach(data => {
        content.push(JSON.parse(data))
    })
    const data = await CoursesData.findOneAndUpdate({ courseName : req.params.courseName},{ $push : {courseContent : content}})
    req.files['media'].forEach(video => {
        data.videos.push(video.filename)
    })
    data.save()
    res.json(data)
})
app.get('/Admin/courses', (req, res) => {
    CoursesData.find()
        .then(data => {
            res.json(data)
        })
})

app.post('/Admin/admin/addAdmin', upload.single('file'), (req, res) => { // adding new admin
    const newAdminData = JSON.parse(req.body.newAdminData)
    newAdmin(newAdminData)
})
app.get('/Ncourse/course/:courseName', (req, res) => { // send courses data 
    console.log(req.params.courseName)
    CoursesData.findOne({ courseName: req.params.courseName })
        .then(data => {
            res.json(data)
        })
})

app.get('/getCourse', (req, res) => {
    CoursesData.find().limit(4).select("-courseContent -videos -createdAt -students")
        .then(data => res.json(data))
})

// get more courses
app.post('/getMoreCourses', (req, res) => {
    let courses_lenght = req.body.coursesLenght
    CoursesData.find()
        .then(data => {
            if (data.length !== courses_lenght) {
                CoursesData.find().limit(courses_lenght + 4).skip(courses_lenght).select("-courseContent -videos -createdAt -students")
                    .then(data => res.json(data))
            } else {
                res.send(false)
            }
        })
})


// student route 
app.get('/Student', (req, res) => {
    let student = req.user
    if(!student){
        res.json(false)
    }else{
        res.json(student)
    }
})

app.post('/logOut', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
    })
})
app.post('/student/setting', upload.single('photo'), async (req, res) => {
    console.log(req.file.filename)
    await Student.findByIdAndUpdate({ _id: req.user._id }, { photo: req.file.filename })
    req.user.photo = req.file.filename
    res.send(true)
})
app.get('/student/course/:courseName', async (req, res, next) => {
    const courseID = req.query.ID
    const courseName = req.params.courseName
    console.log(courseID)
    let courseData = await CoursesData.findOne({ _id: courseID })
    res.json({ "courseData": courseData, "enrolledStatus": courseData.students.includes(req.user._id) })
})
app.post('/student/course/enroll', async (req, res, next) => {
    console.log(req.body)
    console.log(req.user._id)
    const student = await Student.findByIdAndUpdate({ _id: req.user._id }, { $push: { courses: req.body.courseID } })
    const course = await CoursesData.findByIdAndUpdate({ _id: req.body.courseID }, { $push: { students: req.user._id } })
    res.send(true)
})

app.get('/Student/myLearning', async (req, res, next) => {
    let enrolledCourses = []
    const { courses } = await Student.findOne({ _id: req.user._id })
    const course = await CoursesData.find({ _id: courses }).select("courseName category students instructor language providerOrginization courseImg")
    res.json(course)
})

app.post('/student/myLearning/rateCourse',async (req,res) =>  {
    const studentCourseData = await StudentCourse.create({
        studentID: req.user._id,
        courseID: req.body.id,
        rate: +req.body.rate,
        comment: req.body.comment
    })
    await CoursesData.findOneAndUpdate({ _id : studentCourseData.courseID },{ $push : {rate : studentCourseData.rate}})
})
app.post('/student/myLearning/rateCheck',async (req,res) => {
    const {courseID} = req.body;
    const courseRate = await StudentCourse.findOne({courseID : courseID ,studentID : req.user._id })
    console.log(courseRate)
    if(courseRate){
        res.send(true)
    }else{
        res.send(false)
    }
})
app.get('/Student/myLearning/:courseName', async (req, res) => {
    console.log(req.params.courseName)
    let course = await CoursesData.findOne({ courseName: req.params.courseName })
    res.json(course)
})









// databases functions
async function addAccount(newAccountData) {
    const newAccount = await Account.create({
        name: newAccountData.newName,
        username: newAccountData.newUsername,
        password: newAccountData.newPassword,
        email: newAccountData.newEmail,
        phone: newAccountData.newPhone,
        location: newAccountData.newLocation,
        role: newAccountData.role,
        dataId: newAccountData.dataId,
    })
    console.log(newAccount)
}
async function newTeacher(newTeacherData) {
    const newTeacher = await InstructorData.create({
        firstName: newTeacherData.firstName,
        lastName: newTeacherData.lastName,
        userName: `${newTeacherData.firstName}_${newTeacherData.lastName[0]}`,
        phoneNumber: newTeacherData.phoneNumber,
        gender: newTeacherData.gender,
        password: hashing(newTeacherData.password),
        address: newTeacherData.address,
        department: newTeacherData.department,
        email: newTeacherData.email,
        birthDay: newTeacherData.birthDay,
        about: newTeacherData.about,
        teacherImg: imageName
    })
    addAccount({
        newName: `${newTeacherData.firstName} ${newTeacherData.lastName}`,
        newUsername: `${newTeacherData.firstName}_${newTeacherData.lastName[0]}`,
        newPassword: hashing(newTeacherData.password),
        newEmail: newTeacherData.email,
        newPhone: newTeacherData.phoneNumber,
        newLocation: newTeacherData.address,
        role: 'Instructor'
    })
}
async function newAdmin(newAdminData) {
    const adminUserName = `${newAdminData.firstName}_${newAdminData.lastName[0]}`
    const fullName = `${newAdminData.firstName} ${newAdminData.lastName}`

    const newAdmin = await Admin.create({
        fullName: fullName,
        userName: adminUserName,
        email: newAdminData.email,
        phoneNumber: newAdminData.phone,
        address: newAdminData.address,
        photo: imageName,
    })
    addAccount({
        newName: fullName,
        newUsername: adminUserName,
        newPassword: hashing(newAdminData.password),
        newEmail: newAdminData.email,
        newPhone: newAdminData.phone,
        newLocation: newAdminData.address,
        role: 'Admin',
        dataId: newAdmin.id
    })
    console.log(newAdmin)
}
async function newDepartment(newDepartmentData) {
    const newDepartment = await CategoriesData.create({
        name: newDepartmentData.name,
        description: newDepartmentData.description,
        img: imageName,
    })
    console.log(newDepartment)
}

async function newCourse(newCourseData) {
    let { course_image, provider_logo, course_data } = newCourseData;
    // let course_videos_filename = []
    // course_videos.forEach(data => {
    //     course_videos_filename.push(data.filename)
    // });
    const createdAt = new Date();
    const newCourse = await CoursesData.create({
        courseName: course_data.name,
        category: course_data.department,
        courseHour: course_data.hours,
        price: course_data.price,
        description: course_data.description,
        instructor: course_data.instructor,
        language: 'English',
        providerOrginization: course_data.provider,
        createdAt: `${createdAt.getFullYear()}/${createdAt.getMonth() + 1}/${createdAt.getDate()}`,
        providerLogo: provider_logo,
        courseImg: course_image,
        // videos : course_videos_filename,

        // courseWeeks: [{
        //     mainTitle: 'introduction to programming',
        //     description: "asdasdxcvlkjsdlkfsdf",
        //     willLearn: ['css', 'js', 'html'],
        //     secondaryTitles: [
        //         {
        //             title: "html",
        //             description: 'html',
        //             status: false,
        //             videos: [{
        //                 videos: course_videos_filename[0],
        //                 videosName: course_videos_filename[0],
        //                 videosStatus: false,
        //                 videosContentAsString: "hyper text markup  language"
        //             },
        //             {
        //                 videos: course_videos_filename[1],
        //                 videosName: course_videos_filename[1],
        //                 videosStatus: false,
        //                 videosContentAsString: "tags"
        //             }]
        //         },
        //         {
        //             title: "css",
        //             description: 'css',
        //             status: false,
        //             videos: [{
        //                 videos: course_videos_filename[2],
        //                 videosName: course_videos_filename[2],
        //                 videosStatus: false,
        //                 videosContentAsString: "hyper text markup  language"
        //             }]
        //         }
        //     ]
        // }]
    })
    console.log(newCourse)
    return newCourse._id
}

async function student(data) {
    const student = await Student.create({
        full_name: data.newName,
        username: data.newUsername,
        phone: data.newPhone,
        location: data.newLocation,
        email: data.newEmail,
        courses: [],
        photo: null,
        job: null,
        role: 'Student'
    })
    addAccount({
        newName: data.newName,
        newUsername: data.newUsername,
        newPassword: hashing(data.newPassword),
        newEmail: data.newEmail,
        newPhone: data.newPhone,
        newLocation: data.newLocation,
        role: 'Student',
        dataId: student.id
    })
    console.log(student)
}


// hashing password
function hashing(password) {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}
// comparing between user input password and the password in databases
function compareHashing(raw, hash) {
    return bcrypt.compareSync(raw, hash)
}
// send email if forget the password
function sendMail(name, userEmail) {
    const validationCode = Math.floor((Math.random() * 9999) + 1000);
    const traporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bilalsweidan2003@gmail.com',
            pass: 'mgmxvceqaiqzaswy'
        }
    })
    const mailOption = {
        from: 'bilalsweidan2003@gmail.com',
        to: `${userEmail}`,
        subject: "Security Code",
        html: `
        <div style="text-align:center">
            <h1> courses </h1>
            <h3> welcome ${name} </h3>
            <p style="font-size:20px;">  Your validation code is : <span style="color:red;"> ${validationCode} </span>  </p>
        </div>
        `
    }
    traporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err)
            return false
        } else {
            console.log(`Email sent: $ ${info.response}`)
            return true
        }
    })
}
// end log in and sign in 
async function coursesCategory() {
    const category = await CategoriesData.create({
        name: 'cyber scurity',
        description: 'all about cyber security',
        img: '../client/src/assets/cyberSecurity.jpg'
        // courses: ObjectId('64b7c863b8832c995d666609')   
    })
}




const port = 8081
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})